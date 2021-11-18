<script>
  let todoList = []

  const onIncrement = () => {
    const todo = {
      name: 'todo' + (todoList.length + 1),
      qty: Math.random(),
    }
    // 		todoList.push(todo)
    todoList = todoList.concat(todo)
  }

  const onDecrement = () => {
    // 		todoList.pop()
    todoList = todoList.slice(0, -1)
  }
</script>

<h1>Todo List</h1>
<ul>
  {#each todoList as todo}
    <li>{todo.name} x {todo.qty}</li>
  {/each}
</ul>
<button on:click={onIncrement}> + </button>
<button on:click={onDecrement}> - </button>
