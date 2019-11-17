<script>
  import { onMount } from "svelte";
  import HotelThumb from "./HotelThumb.svelte";
  import { getHotelsList } from "../services/hotels";
  import Text from '../text';
  import sortBy from 'lodash/sortBy';

  export let filter = {};

  let prevFilter = {};

  let hotels = [];
  let viewHotels = [];

  let priceSortingDirection = 1; // 1 ASC, -1 DESC
  let priceSortingDirectionStr;

  $: {
    if (hotels.length > 0) {

      switch (priceSortingDirection) {
        case 1:
          priceSortingDirectionStr = Text.sortDesc; // ASC --> DESC
          break;
        case -1:
          priceSortingDirectionStr = Text.sortAsc; // DESC --> ASC
          break;
      }
      
      let list = sortBy([...hotels], [x => priceSortingDirection * x.price]);

      if (filter.stars) {
        list = list.filter(h => h.stars === +filter.stars);
      }
      if (filter.price) {
        const _len = 10 ** +filter.price.length / 10;
        const fingerprint = Math.round(+filter.price / _len);
        list = list.filter(h => Math.round(h.price / _len) === fingerprint);
      }
      if (filter.hotelname) {
        const fingerprint = filter.hotelname.toLowerCase();
        list = list.filter(h => h.name.toLowerCase().indexOf(fingerprint) > -1);
      }
      if (filter.rating) {
        const fingerprint = Math.round(+filter.rating);
        list = list.filter(h => Math.round(h.rating) === fingerprint);
      }

      viewHotels = list;
      prevFilter = Object.assign({}, filter);
    }
  }

  function onSortChange() {
    priceSortingDirection *= -1;
  }

  onMount(async () => {
    hotels = await getHotelsList();
  });
</script>

<button on:click={onSortChange}>{Text.sortByPriceBtn} {priceSortingDirectionStr}</button>

{#if viewHotels.length > 0}
  {#each viewHotels as hotel}
    <HotelThumb data={hotel} />
  {/each}
{:else}
  <p>{Text.noResultsForFilterMsg}</p>
{/if}