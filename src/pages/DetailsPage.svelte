<script>
    import { onMount } from "svelte"
    import { Link } from "svelte-routing";
    import { getHotelsList } from "../services/hotels";

    export let id;

    let hotel = { placeholder: true, };

    onMount(async () => {
        const hotels = await getHotelsList();
        hotel = hotels.find(h => h.id === +id);
    });
</script>

<nav>
    <Link to="/">Home</Link>
</nav>

{#if !hotel.placeholder }
    <h2>{hotel.name}</h2>

    <div>{@html hotel.description}</div>
{/if}