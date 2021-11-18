# Decrypt Svelte -- Part Two: Reactive

## 前情回顾

在[上一篇文章](./Decrypt_Svelte.md)中，我们介绍了一下 `Svelte` 的整体工作流。今天这篇文章我们着重来看看 `Svelte` 的响应式机制。

我们知道一个 `Svelte` 组件经过编译会生成三部分代码：

- 数据更新相关的闭包

  - DOM 渲染所需要的数据（数据+事件）统一放到 ctx 数组中对外暴露
  - DOM 事件包装:
    1. 更新状态
    2. 更新对应的 DOM
  - Props 变更后的更新机制（逻辑同 DOM 事件包装）
  - 衍生数据更新机制

  >```js
  >function instance($$self, $$props, $$invalidate) {
  >  let dCount
  >  let ddCount
  >  let { name = 'world' } = $$props
  >  let { isSafe = true } = $$props
  >  let count = 0
  >
  >
  >  const onIncrement = () => {
  >    // DOM 事件包装
  >    $$invalidate(1, (count += 1))
  >  }
  >
  >  const onDecrement = () => {
  >    // DOM 事件包装
  >    $$invalidate(1, (count -= 1))
  >  }
  >
  >  // Props 变更后的更新机制
  >  $$self.$$set = ($$props) => {
  >    if ('name' in $$props) $$invalidate(0, (name = $$props.name))
  >    if ('isSafe' in $$props) $$invalidate(5, (isSafe = $$props.isSafe))
  >  }
  >
  >  // 衍生数据更新机制
  >  $$self.$$.update = () => {
  >    if ($$self.$$.dirty & /*count*/ 2) {
  >      $: $$invalidate(6, (dCount = count * 2))
  >    }
  >
  >    if ($$self.$$.dirty & /*dCount*/ 32) {
  >      $: $$invalidate(2, (ddCount = dCount * 2))
  >    }
  >
  >    if ($$self.$$.dirty & /*dCount*/ 32) {
  >      $: console.log('dCount is ' + dCount)
  >    }
  >  }
  >
  >  // DOM 渲染所需要的数据（数据+事件）统一放到 ctx 数组中对外暴露
  >  return [name, count, ddCount, onIncrement, onDecrement, isSafe, dCount]
  >}
  >```

- DOM 操作相关的闭包
  
  >```js
  >function create_fragment(ctx) {
  >  let main
  >  let p
  >  let t0
  >  let t1
  >  let t2
  >  let todolist
  >  let current
  >  todolist = new TodoList({})
  >
  >  ...
  >
  >  return {
  >    // 创建 DOM
  >    c() {
  >      main = element('main')
  >      p = element('p')
  >      t0 = text('count: ')
  >      t1 = text(/*count*/ ctx[0])
  >      t2 = space()
  >      create_component(todolist.$$.fragment)
  >      attr(main, 'class', 'svelte-1e9puaw')
  >
  >      ...
  >
  >    },
  >    // 挂载 DOM
  >    m(target, anchor) {
  >      insert(target, main, anchor)
  >      append(main, p)
  >      append(p, t0)
  >      append(p, t1)
  >      append(p, t2)
  >
  >      ...
  >      // 挂载组件
  >      mount_component(todolist, main, null)
  >      current = true
  >
  >      // 添加事件监听、收集卸载组件时的事件清理函数
  >      if (!mounted) {
  >        dispose = [
  >          listen(button0, "click", /*onIncrement*/ ctx[3]),
  >          listen(button1, "click", /*onDecrement*/ ctx[4])
  >        ];
  >
  >        mounted = true;
  >      }
  >    },
  >    // 更新 DOM
  >    p(ctx, [dirty]) {
  >      if (!current || dirty & /*count*/ 1) set_data(t1, /*count*/ ctx[0])
  >      if (!current || dirty & /*ddCount*/ 2) set_data(t4, /*ddCount*/ ctx[1])
  >    },
  >    // DOM 卸载及相关的监听事件卸载
  >    d() {
  >      ...
  >    }
  >
  >    ...
  >
  >  }
  >}
  >```

- 组件类
  
  > 组件实例化、相关状态初始化及DOM初始化工作。
  
  >```js
  >class App extends SvelteComponent {
  >  constructor(options) {
  >    super()
  >    // 初始化数据，初始化 DOM，调度一次更新
  >    init(this, options, instance, create_fragment, safe_not_equal, { name: 0, isSafe: 5 })
  >  }
  >}
  >```

  下面我们从用户触发事件为入口，详细为大家讲解 Svelte 的响应式机制。

## Svelte 响应式详解

 让我们以用户交互为入口，一步步探究 Svelte 响应式的原理。

- 用户交互

  >```js
  >  // 计数：用户加 1 
  >  const onIncrement = () => {
  >    $$invalidate(1, (count += 1))
  >  }
  >
  >  => 拆解
  >
  >  const onIncrement = () => {
  >    count += 1
  >    $$invalidate(1, count)
  >  }
  >```

  用户交互事件产生后，做了两件事：

    - 更新 count 状态： `count += 1`

    - 通知更新：`$$invalidate(1, count)`


- 通知更新
  
  1. 比较是否状态发生改变
  2. 如果状态发生改变，标记该组件上下文的第 `i` 位数据为脏数据(i 为数组下标)

  >```js
  > const $$invalidate = (i/* 需要更新上下文 ctx 中的那个位置的数据 **/, value/* 最新值 */) => {
  >   // 比较状态是否改变
	>   if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
  >      // 标记当前组件的上下文的第 `i` 数据为脏数据
	>      if (ready) make_dirty(component, i);
	>   }
	>   return ret;
  >}

- 标记脏数据

  >```js
  >function make_dirty(component/** 需要更新的组件 */, i/** 需要更新的状态在ctx中的位置 */) {
  >   // 组件是否有脏数据
  >   if (component.$$.dirty[0] === -1) {
  >     // 如果之前没有脏数据，将当前组件添加到脏组件队列
  >     dirty_components.push(component);
  >     // 调度一次更新，只是调度，异步执行
  >     schedule_update();
  >     // 初始化标记是否有脏数据的数组
  >     component.$$.dirty.fill(0);
  >   }
  >   // 标记那个数据是脏数据
  >   component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
  >}
  >```

  1. 判断组件之前是否有脏数据需要更新

    1. 如果之前没有脏数据需要更新，将当前组件添加到脏组件队列

        `dirty = [-1]` 表示没有脏数据

    2. 调度新一次的组件更新(异步任务：Svelte 以 Promise 来调度任务执行)

    3. 初始化标记脏数据的数组

        `dirty = [00 0000 0000 0000 0000 0000 0000 0000]` 
        
        > **数组每一项最多标记 31 个数据的变化，每超过31数据自动增加一个数组**

  2. 标记脏数据的位置

      ```js
      component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
      ```

      上面的表达式大家自行体会，实际 dirty 状态如下：

      `dirty = [000 0000 0000 0000 0000 0000 0000 0001]` // 组件第一个数据是脏数据
      `dirty = [000 0000 0000 0000 0000 0000 0000 0101]` // 组件第一个、第三个数据是脏数据
      `dirty = [010 0000 0000 0000 0000 0000 0000 0101]` // 组件第一个、第三个、第三十个数据是脏数据
      ...
      `dirty = [000 0000 0000 0000 0000 0000 0000 0000, 000 0000 0000 0000 0000 0000 000 1110]` // 组件第三十三、第三十四个、第三十五个数据是脏数据
      ...

- 调度新一次组件更新
  
  标记完组件脏数据之后，就需要调度新一次更新来将数据变更更新到界面上。


  ```js
  function flush() {
    do {
      for (let i = 0; i < dirty_components.length; i += 1) {
        const component = dirty_components[i];
        set_current_component(component);
        if ($$.fragment !== null) {
          $$.update();
          run_all($$.before_update);
          const dirty = $$.dirty;
          $$.dirty = [-1];
          $$.fragment && $$.fragment.p($$.ctx, dirty);

          $$.after_update.forEach(add_render_callback);
        }
      }
      set_current_component(null);
      ...
    } while (dirty_components.length);

    while (flush_callbacks.length) {
      flush_callbacks.pop()();
    }

    seen_callbacks.clear();
  }
  ```

  1. 遍历所有的脏组件队列中的组件，更新组件
     1. 更新衍生数据

        调用数据闭包暴露的 update 方法更新

        **Svelte 在编译期就已经确定了数据和衍生数据的映射关系**

        ```js
        const update = () => {
          if ($$self.$$.dirty & /*count*/ 2) {
            $: $$invalidate(6, (dCount = count * 2))
          }
        
          if ($$self.$$.dirty & /*dCount*/ 32) {
            $: console.log('dCount is ' + dCount)
          }
        }
        ```

        > 判断上下文中第二个数据 `count` 是否有更新，如果有更新，运行状态更新逻辑（同本章中的**通知更新**小节）

        > 副作用相关（与DOM渲染无关的）不会触发DOM更新逻辑

     2. 执行组件生命周期 `before_update`
     3. 更新 DOM 节点

        调用 DOM 闭包暴露的方法更新

        **Svelte 在编译期就已经确定了数据和DOM节点的映射关系**

        >```js
        >    const p = (ctx/** 上下文，包含DOM渲染所需的数据和方法 */, [dirty/** 标记脏数据的数组 */]) {
        >      // 通过比较 dirty 看 count（ctx 上下文中第一个数据） 是否有更新，如果有，更新对应的 DOM
        >      if (!current || dirty & /*count*/ 1) set_data(t1/** 对应的 DOM 节点 */, /*count*/ ctx[0])
        >      // 通过比较 dirty 看 ddCount 上下文中第二个数据） 是否有更新，如果有，更新对应的 DOM
        >      if (!current || dirty & /*ddCount*/ 2) set_data(t4/** 对应的 DOM 节点 */, /*ddCount*/ ctx[1])
        >    },
        >```

        > 注意：确定数据是否有变更时，使用的是位运算
        >
        > 000 0000 0000 0000 0000 0000 0000 0001   // 标记脏数据数组
        > 000 0000 0000 0000 0000 0000 0000 0001   // 第一个数据 count 是否有更新
        > *-------------------------------------------------*
        > 000 0000 0000 0000 0000 0000 0000 0001   // 第一个数据 count 有更新

        `set_data` 逻辑比较简单，即更新对应的文本节点的值

     4. 执行组件生命周期 `after_update`
  2. 如果更新过程中产生新的脏数据，则从 Step 1 继续更新
  3. 调度结束，清理工作

## Props 更新机制

- 当父组件传递给子组件的数据发生变化时，父组件会在更新 DOM 节点时调用 子组件暴露的 $set方法批量更新子组件
- 其他更新机制同响应式详解章节
  
```js
// 父组件更新 DOM 方法
parentFragment.p = (ctx, [dirty]) => {
    const todolist_changes = {};
    if (dirty & /*dCount*/ 4) todolist_changes.dCount = /*dCount*/ ctx[2];
    if (dirty & /*a*/ 8) todolist_changes.a = /*a*/ ctx[3];
    todolist.$set(todolist_changes);
}

// 子组件
childComp.$$set = $$props => {
    if ('dCount' in $$props) $$invalidate(0, dCount = $$props.dCount);
    if ('a' in $$props) $$invalidate(1, a = $$props.a);
}
```


## 对比其他框架

- 更新逻辑在编译期就已经确定，没有繁重的 `runtime` `diff` 逻辑
- 更新逻辑简单、更新 DOM 节点精确
- 更新粒度细：DOM 节点纬度更新