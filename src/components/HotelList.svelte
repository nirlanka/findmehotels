<script>
    import { onMount } from 'svelte';
    import HotelThumb from './HotelThumb.svelte';
    import { getHotelsList } from '../services/hotels';

    export let filter = {};

    let prevFilter = {};

    let hotels = [];
    let filteredHotels = [];

    $: {
        if (hotels.length > 0) {
            let list = [...hotels];

            if (filter.hotelname !== prevFilter.hotelname) { 
                list = list.filter(h => h.name.toLowerCase().indexOf(filter.hotelname.toLowerCase()) > -1);
            }

            filteredHotels = list;
            prevFilter = Object.assign({}, filter);
        }
    }

    onMount(async () => {
        hotels = await getHotelsList();
    });
</script>

{#each filteredHotels as hotel}
<HotelThumb data={hotel} />
{/each}