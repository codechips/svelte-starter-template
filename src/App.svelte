<style>
  h1 {
    color: navy;
    font-size: 3em;
  }
</style>

<script lang="typescript">
  import { timer } from './timer';

  let name: string = 'Handsome';

  let five: number = 5;
  $: sum = $timer + five;
</script>

<h1>Hello {name}! Time is ticking! {sum}</h1>
