<script>
  import HotelThumb from "./HotelThumb.svelte";
  import Text from "../text";
  import sortBy from "lodash/sortBy";

  export let filter = {};
  export let hotels = [];

  let prevFilter = {};
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
      if (filter.minPrice || filter.maxPrice) {
        const minPrice = +(filter.minPrice || 0);
        const maxPrice = +(filter.maxPrice || 0);

        if (maxPrice) {
          list = list.filter(h => h.price >= minPrice && h.price <= maxPrice);
        } else {
          list = list.filter(h => h.price >= minPrice);
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

  function onSortChange() {
    priceSortingDirection *= -1;
  }
</script>

<button on:click={onSortChange}>
  {Text.sortByPriceBtn} {priceSortingDirectionStr || ''}
</button>

{#if viewHotels.length > 0}
  {#each viewHotels as hotel}
    <HotelThumb data={hotel} />
  {/each}
{:else}
  <p>{Text.noResultsForFilterMsg}</p>
{/if}
