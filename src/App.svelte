<script lang="typescript">
  import { onMount } from 'svelte';
  import { timer } from './timer';

  let name: string = 'Sailor';
  let current: number = 0;

  onMount(() => {
    const unsub = timer.subscribe(val => (current = val));
    return () => unsub();
  });

  let five: number = 5;
  let sum: number = 0;

  $: sum = current + five;
</script>

<h1>Hello {name} {sum}!</h1>
