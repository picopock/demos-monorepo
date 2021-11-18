# Decrypt Svelte -- Part One: Workflow

## What is Svelte?

Svelte 是一个`重 Compile 轻 Runtime`、`轻量级` 的`响应式` `UI 框架`，类似于目前的一些头部框架 React、Vue 等。

小而全，该有的基本都有，别的框架没有的它也有：Store、Reactive、SSR、Animate、Transition

### Example

```svelte
// App.svelte

<script>
import TodoList from './TodoList.svelte'

export let name = 'world'

let count = 0
$: dCount = count * 2
$: ddCount = dCount * 2
$: console.log('dCount is ' + dCount)

const onIncrement = () => {
  count += 1
}

const onDecrement = () => {
  count -= 1
}
</script>

<main>
  <h1>Hello {name}!</h1>
  <p>Hello, everyone!</p>
  <p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>

  <p>
    count: {count} <br />
    ddCount: {ddCount}
  </p>
  <button on:click={onIncrement}> + </button>
  <button on:click={onDecrement}> - </button>

  <TodoList />
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

```

## Workflow

### Compile

- Template

  ```svelte
  // before compile;
  <main>
    <h1>Hello {name}!</h1>
    <p>Hello, everyone!</p>
    <p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>

    <p>
      count: {count} <br />
      ddCount: {ddCount}
    </p>
    <button on:click={onIncrement}> + </button>
    <button on:click={onDecrement}> - </button>

    <TodoList />
  </main>
  ```

  ```js
  // after compile
  function create_fragment(ctx) {
    let main
    let p
    let t0
    let t1
    let t2
    let br
    let t3
    let t4
    let t5
    let todolist
    let current
    todolist = new TodoList({})

    ...

    return {
      // create
      c() {
        main = element('main')
        p = element('p')
        t0 = text('count: ')
        t1 = text(/*count*/ ctx[0])
        t2 = space()
        br = element('br')
        t3 = text('\n    ddCount: ')
        t4 = text(/*ddCount*/ ctx[1])
        t5 = space()
        create_component(todolist.$$.fragment)
        attr(main, 'class', 'svelte-1e9puaw')

        ...

      },
      // mount
      m(target, anchor) {
        // attach dom
        insert(target, main, anchor)
        append(main, p)
        append(p, t0)
        append(p, t1)
        append(p, t2)
        append(p, br)
        append(p, t3)
        append(p, t4)
        append(main, t5)

        ...

        mount_component(todolist, main, null)
        current = true

        // event listener
        if (!mounted) {
          dispose = [
            listen(button0, "click", /*onIncrement*/ ctx[3]),
            listen(button1, "click", /*onDecrement*/ ctx[4])
          ];

          mounted = true;
        }
      },
      // trigger DOM update
      p(ctx, [dirty]) {
        if (!current || dirty & /*count*/ 1) set_data(t1, /*count*/ ctx[0])
        if (!current || dirty & /*ddCount*/ 2) set_data(t4, /*ddCount*/ ctx[1])
      },
      // detach
      d() {
        ...
      }

      ...

    }
  }
  ```

- Javascript

  ```svelte
  // before compile

  <script>
    import TodoList from './TodoList.svelte';

    export let name = 'world';
    export let isSafe = true;

    let count = 0;

    $: dCount = count * 2;
    $: ddCount = dCount * 2;
    $: console.log('dCount is ' + dCount);

    const onIncrement = () => {(count += 1)};
    const onDecrement = () => {(count -= 1)};
  </script>
  ```

  ```js
  // after compile

  function instance($$self, $$props, $$invalidate) {
    let dCount
    let ddCount
    let { name = 'world' } = $$props
    let { isSafe = true } = $$props
    let count = 0

    const onIncrement = () => {
      $$invalidate(1, (count += 1))
    }

    const onDecrement = () => {
      $$invalidate(1, (count -= 1))
    }

    $$self.$$set = ($$props) => {
      if ('name' in $$props) $$invalidate(0, (name = $$props.name))
      if ('isSafe' in $$props) $$invalidate(5, (isSafe = $$props.isSafe))
    }

    $$self.$$.update = () => {
      if ($$self.$$.dirty & /*count*/ 2) {
        $: $$invalidate(6, (dCount = count * 2))
      }

      if ($$self.$$.dirty & /*dCount*/ 64) {
        $: $$invalidate(2, (ddCount = dCount * 2))
      }

      if ($$self.$$.dirty & /*dCount*/ 64) {
        $: console.log('dCount is ' + dCount)
      }
    }

    return [name, count, ddCount, onIncrement, onDecrement, isSafe, dCount]
  }

  class App extends SvelteComponent {
    constructor(options) {
      super()
      init(this, options, instance, create_fragment, safe_not_equal, { name: 0, isSafe: 5 })
    }
  }
  ```

- CSS

  > Scoped Mode by default (similar to css module).

  ```css
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
  ```

  ```css
  main.svelte-1e9puaw {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }
  h1.svelte-1e9puaw {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }
  @media (min-width: 640px) {
    main.svelte-1e9puaw {
      max-width: none;
    }
  }
  ```

### [Workflow](https://www.processon.com/view/link/613e3d680e3e747075a7dbd5)

<!-- <iframe width="100%" height="800px" src="https://www.processon.com/view/link/613e3d680e3e747075a7dbd5" ></iframe> -->

## Framework Comparison

### Runtime && Compile

- Svelte：重 Compile 轻 Runtime

  最多给你添加个 web components 支持，什么 vDOM、Diff，简简单单不好么(\*￣︶￣)）

- React：重 Runtime 轻 Compile。

  运行时做了大量的工作（最多支持个 JSX 语法，不能再多了）

- Vue：兼顾用户开发体验和性能

  Runtime、Compile 我全都要（vDOM、Diff、Template）

### Code

- React、Vue 需要引入 Runtime，Svelte 不需要引入单独的 Runtime。

- 在组件量级小的时候 Svelte 优于 React、Vue，量级达到一定数量级后优势不明显。

### Update Granularity

- React: 以组件纬度做更新。`Batch Update`

  告诉你那个组件需要更新，组件内部的更新需要通过 vDOM diff 及用户逻辑(memo、shouldUpdate)共同决定。

- Vue: 可以监听原子级别的数据变更，更新是以组件的纬度做更新。`Batch Update`

  精确知道那个组件需要更新，vDOM diff 决定内部更新细节

- Svelte: 可以监听原子级别的数据变更，更新以 DOM 元素的纬度更新。`Batch Update`

  精确知道那个 DOM 元素需要更新。

### Update Mechanism

- React: setState + VDOM + Diff

  需要显示的声明状态改变(setState)来触发一次全量 Diff，然后更新差异。
  有规范的约束，开发者有心智负担。

- Vue(3): Proxy/(Getter/Setter) + VDOM + Diff

  基于 Proxy 和 Getter/Setter 收集依赖，从而做出响应。
  按照 SFC 规范书写响应式，相对 React 来说，束缚更少，开发体验更优。

- Svelte(3): Mark Dirty + Flush

  vDOM 绝缘体。
  按照正常的 JS 规范书写，没有什么黑魔法，没有约束，没有心智负担。

### Architecture

- React、Vue 是分层架构

  vDOM + Platform Code，拓展灵活，方便多端统一开发。
  eg. React Reconciler + Platform Code(PDF、DOM、Native、Applet...)

- Svelte 非分层架构

  没有 vDOM, 灵活性不足。

## Possible Scenarios

- Public Component Library

- Event Page

## Reference

- [Svelte 3: Rethinking reactivity](https://www.sveltejs.cn/blog/svelte-3-rethinking-reactivity)
- [如何看待 svelte 这个前端框架？](https://www.zhihu.com/question/53150351)
