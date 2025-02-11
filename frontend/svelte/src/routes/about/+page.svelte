<script lang="ts">
	import { derived as dderived, readable, get } from 'svelte/store';
	import TodoList from '../TodoList.svelte';

	let { name = 'world' }: { name: string } = $props();

	let count = $state(0);
	let dCount = $derived(count * 2);
	let ddCount = $derived(dCount * 2);
	$inspect('dCount is ' + dCount);

	const onIncrement = () => {
		count += 1;
	};

	const onDecrement = () => {
		count -= 1;
	};

	const time = readable<Date>(new Date(), (set) => {
		const interval = setInterval(() => {
			console.log('interval called');
			set(new Date());
		}, 1000);

		return () => clearInterval(interval);
	});

	time.subscribe((v) => {
		console.log('time v:', v);
	});

	const tick = dderived(
		time,
		(value, set) => {
			const seconds = value.getSeconds() + 2;
			set(seconds);
		},
		0
	);
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="text-column">
	<h1>About this app</h1>

	<p>
		This is a <a href="https://svelte.dev/docs/kit">SvelteKit</a> app. You can make your own by typing
		the following into your command line and following the prompts:
	</p>

	<pre>npx sv create</pre>

	<p>
		The page you're looking at is purely static HTML, with no client-side interactivity needed.
		Because of that, we don't need to load any JavaScript. Try viewing the page's source, or opening
		the devtools network panel and reloading.
	</p>

	<p>
		The <a href="/sverdle">Sverdle</a> page illustrates SvelteKit's data loading and form handling. Try
		using it with JavaScript disabled!
	</p>

	<h1>Hello {name}!</h1>
	<p>Hello, everyone!</p>
	<p>
		Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte
		apps.
	</p>

	<p>
		count: {count} <br />
		ddCount: {ddCount}
	</p>
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
	<TodoList />
	<br />
	----------------------------
	<p>通过get 获取到的是快照：{get(time)}</p>
	<br />
	通过$time可以实时订阅数据变化:: {$time}
	<br />
	----------------------------
	<br />
	drivered tick: {$tick}
</div>
