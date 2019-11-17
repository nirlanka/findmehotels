<script>
    import { onMount } from "svelte"
    import { Link } from "svelte-routing";
    import { getHotelsList } from "../services/hotels";
    import Text from '../text';
    import Review from '../components/Review.svelte';
    import sortBy from 'lodash/sortBy';
    import SearchBox from '../components/SearchBox.svelte';

    export let id;

    let hotel = { placeholder: true, };
    let filteredReviews = [];

    function onFilterChange(filterText) {
        if (!hotel.placeholder) {
            let list = hotel.reviews.map(review => ({ review, searchResultPoints: false }));

            if (filterText) {
                const searchWords = filterText.replace(/\,/g, ' ').split(' ').filter(x => x.trim());
                list.forEach(rw => {
                    rw.searchResultPoints = searchWords.filter(w => rw.review.description.indexOf(w) > -1).length;
                });
                list = sortBy(list, rw => -1 * rw.searchResultPoints);
            }

            filteredReviews = list;
        } 
    }

    onMount(async () => {
        const hotels = await getHotelsList();
        hotel = hotels.find(h => h.id === +id);
        onFilterChange('');
    });
</script>

<nav>
    <Link to="/">Home</Link>
</nav>

{#if !hotel.placeholder}
    <h2>{hotel.name}</h2>
    <p>{hotel.address}</p>
    <p>
        {Text.usd}{hotel.price} &mdash; {hotel.rating}/10 {Text.reviewRaiting} &mdash; {hotel.stars}/5
        {Text.starRating}
    </p>
    <div>{@html hotel.description}</div>

    {#if filteredReviews && filteredReviews.length > 0}
        <SearchBox 
            placeholder={Text.searchReviewText}
            onTextChange={onFilterChange} />
    {/if}

    {#each filteredReviews as reviewWrapper}
        <Review review={reviewWrapper.review} highlight={reviewWrapper.searchResultPoints} />
    {/each}
{:else}
    <p>{Text.loadingDetails}</p>
{/if}