<script>
  import { derived, readable, get } from "svelte/store";
  import TodoList from "./TodoList.svelte";

  export let name = "world";

  let count = 0;
  $: dCount = count * 2;
  $: ddCount = dCount * 2;
  $: console.log("dCount is " + dCount);

  const onIncrement = () => {
    count += 1;
  };

  const onDecrement = () => {
    count -= 1;
  };

  const time = readable(null, set => {
    set(new Date());

    const interval = setInterval(() => {
      console.log("interval called");
      set(new Date());
    }, 1000);

    return () => clearInterval(interval);
  });

  time.subscribe(v => {
    console.log("time v:", v);
  });

  const tick = derived(
    time,
    ($frequency, set) => {
      console.log("cb called: ", $frequency);
      const interval = setInterval(() => {
        const d = Date.now();
        set(d);
        console.log("interval date:", d);
      }, 1000 / $frequency);

      return () => {
        console.log("callback return fn : ");
        clearInterval(interval);
      };
    },
    "one moment..."
  );
</script>

<main>
  <h1>Hello {name}!</h1>
  <p>Hello, everyone!</p>
  <p>
    Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn
    how to build Svelte apps.
  </p>

  <p>
    count: {count} <br />
    ddCount: {ddCount}
  </p>
  <button on:click={onIncrement}> + </button>
  <button on:click={onDecrement}> - </button>

  <TodoList />
  <br />
  ----------------------------
  <br />
  {get(tick)}
  <br />
  ----------------------------
  <p>{get(time)}</p>
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
