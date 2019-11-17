<script>
    import { onMount } from 'svelte';
    import HotelThumb from './HotelThumb.svelte';
    import { getHotelsList } from '../services/hotels';

    let hotels = [];

    onMount(async () => {
        hotels = await getHotelsList();
    });
</script>

{#each hotels as hotel}
<HotelThumb data={hotel} />
{/each}