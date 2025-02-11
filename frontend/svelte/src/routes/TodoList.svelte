<script lang="ts">
	let todoList = $state<{ name: string; qty: number }[]>([]);

	const onIncrement = () => {
		const todo = {
			name: 'todo' + (todoList.length + 1),
			qty: Math.random()
		};
		// 		todoList.push(todo)
		todoList = todoList.concat(todo);
	};

	const onDecrement = () => {
		// 		todoList.pop()
		todoList = todoList.slice(0, -1);
	};
</script>

<h1>Todo List</h1>
<ul>
	{#each todoList as todo}
		<li>{todo.name} x {todo.qty}</li>
	{/each}
</ul>
<div class="flex gap-2">
	<button
		class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
		onclick={onIncrement}
	>
		+
	</button>
	<button
		class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
		onclick={onDecrement}
	>
		-
	</button>
</div>
