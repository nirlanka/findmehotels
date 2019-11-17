<script>
    import debounce from 'lodash/debounce';
    import Text from '../text';

    export let onTextChange;
    export let placeholder;

    let text;
    const _onTextChange = debounce(onTextChange, 400);
</script>

<input type="text" 
    bind:value={text} 
    on:input={event => _onTextChange(text)}
    placeholder={placeholder}>

<button on:click={() => text = ''}>{Text.clearbtn}</button>