<script>
  import { onMount } from "svelte";
  import HotelThumb from "./HotelThumb.svelte";
  import { getHotelsList } from "../services/hotels";
  import Text from '../text';
  import sortBy from 'lodash/sortBy';
  import minBy from 'lodash/minBy';
  import maxBy from 'lodash/maxBy';

  export let filter = {};

  let prevFilter = {};

  let hotels = [];
  let viewHotels = [];

  let priceSortingDirection = 1; // 1 ASC, -1 DESC
  let priceSortingDirectionStr;

  let actualPriceMin, actualPriceMax, minPrice, maxPrice;

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

  function onSortChange() {
    priceSortingDirection *= -1;
  }

  function clearPriceFilter() {
    minPrice = '';
    maxPrice = '';
  }

  onMount(async () => {
    hotels = await getHotelsList();
    actualPriceMin = minBy(hotels, h => h.price).price;
    actualPriceMax = maxBy(hotels, h => h.price).price;
    console.log(actualPriceMin, actualPriceMax);
  });
</script>

<div class="inline-block">

  <label for="priceFilterMin">{Text.minPriceFilter}</label>
  <input type="range" list="tickmarks-min" min={actualPriceMin} max={actualPriceMax} step="10" bind:value={minPrice} name="priceFilterMin" />
  <datalist id="tickmarks-min">
    <option value="0" label={actualPriceMin}></option>
    <option value="10"></option>
    <option value="20"></option>
    <option value="30"></option>
    <option value="40"></option>
    <option value="50"></option>
    <option value="60"></option>
    <option value="70"></option>
    <option value="80"></option>
    <option value="90"></option>
    <option value="100" label={actualPriceMax}></option>
  </datalist>

  <label for="priceFilterMax">{Text.maxPriceFilter}</label>
  <input type="range" list="tickmarks-max" min={actualPriceMin} max={actualPriceMax} step="10" bind:value={maxPrice} name="priceFilterMax" />
  <datalist id="tickmarks-max">
    <option value="0" label={actualPriceMin}></option>
    <option value="10"></option>
    <option value="20"></option>
    <option value="30"></option>
    <option value="40"></option>
    <option value="50"></option>
    <option value="60"></option>
    <option value="70"></option>
    <option value="80"></option>
    <option value="90"></option>
    <option value="100" label={actualPriceMax}></option>
  </datalist>

</div>

<button on:click={onSortChange}>{Text.sortByPriceBtn} {priceSortingDirectionStr || ''}</button>

{#if viewHotels.length > 0}
  {#each viewHotels as hotel}
    <HotelThumb data={hotel} />
  {/each}
{:else}
  <p>{Text.noResultsForFilterMsg}</p>
{/if}