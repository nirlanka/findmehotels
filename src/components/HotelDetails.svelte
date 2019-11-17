<script>
  import { onMount } from "svelte";

  export let data;

  let descEl;
  onMount(() => {
    descEl.innerHTML = DomPurify.sanitize(data.description);
  });
</script>

<div bind:this={descEl} />
