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

  let minPrice, maxPrice;

  function onFilter() {
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
      if (minPrice || maxPrice) {
        const _minPrice = +(filter.minPrice || 0);
        const _maxPrice = +(filter.maxPrice || 0);

        if (_maxPrice) {
          list = list.filter(h => h.price >= _minPrice && h.price <= _maxPrice);
        } else {
          list = list.filter(h => h.price >= _minPrice);
        }
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

  $: {
    onFilter();
  }

  function onSortChange() {
    priceSortingDirection *= -1;
  }

  function clearPriceFilter() {
    minPrice = '';
    maxPrice = '';
  }

  onMount(async () => {
    hotels = await getHotelsList();
  });
</script>

<input type="number" 
  bind:value={minPrice}
  placeholder={Text.minPriceFilter}
  on:input={onFilter} />
<input type="number" 
  bind:value={maxPrice}
  placeholder={Text.maxPriceFilter}
  on:input={onFilter} />
<button on:click={clearPriceFilter}>{Text.clearbtn}</button>

<button on:click={onSortChange}>{Text.sortByPriceBtn} {priceSortingDirectionStr || ''}</button>

{#if viewHotels.length > 0}
  {#each viewHotels as hotel}
    <HotelThumb data={hotel} />
  {/each}
{:else}
  <p>{Text.noResultsForFilterMsg}</p>
{/if}