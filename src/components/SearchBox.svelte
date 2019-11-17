<script>
  import debounce from "lodash/debounce";
  import Text from "../text";

  export let onTextChange;
  export let placeholder;
  export let timeout = 250;

  let text;
  const _onTextChange = debounce(onTextChange, timeout);

  export function clearText() {
    text = "";
    _onTextChange("");
  }
</script>

<slot name="behavior" :on="on" :actions="actions" />

<input
  type="text"
  bind:value={text}
  on:input={event => _onTextChange(text)}
  {placeholder} />

<button on:click={clearText}>{Text.clearbtn}</button>
