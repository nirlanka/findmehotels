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

            if (filter.stars) { 
                list = list.filter(h => h.stars === +filter.stars);
            }
            if (filter.price) { 
                const _len = (10 ** +filter.price.length)/10;
                const fingerprint = Math.round(+filter.price/_len);
                list = list.filter(h => Math.round(h.price/_len) === fingerprint);
            }
            if (filter.hotelname) { 
                const fingerprint = filter.hotelname.toLowerCase();
                list = list.filter(h => h.name.toLowerCase().indexOf(fingerprint) > -1);
            }
            if (filter.rating) { 
                const fingerprint = Math.round(+filter.rating);
                list = list.filter(h => Math.round(h.rating) === fingerprint);
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