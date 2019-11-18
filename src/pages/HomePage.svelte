<script>
  import HotelList from "../components/HotelList.svelte";
  import SearchBox from "../components/SearchBox.svelte";
  import Text from "../text";
  import HotelService from "../services/hotels";
  import { onMount } from "svelte";
  import minBy from "lodash/minBy";
  import maxBy from "lodash/maxBy";

  let stars, minPrice, maxPrice, hotelname, rating;
  let starSearch, nameSearch, ratingSearch;
  let hotels;

  function clearPriceFilter() {
    minPrice = minBy(hotels, h => h.price).price;
    maxPrice = maxBy(hotels, h => h.price).price;
  }

  function clearAll() {
    stars = hotelname = rating = "";
    starSearch.clearText();
    clearPriceFilter();
    nameSearch.clearText();
    ratingSearch.clearText();
  }

  onMount(async () => {
    hotels = await (new HotelService()).getHotelsList();
    clearPriceFilter();
  });
</script>

<span>{Text.starRatingInput}:</span>
<SearchBox
  placeholder={Text.starRatingInput}
  onTextChange={text => (stars = text)}
  bind:this={starSearch} />

<span>{Text.priceRangeLabel}:</span>
<input
  type="number"
  bind:value={minPrice}
  placeholder={Text.minPriceFilter}
  min={minPrice}
  max={maxPrice} />
<input
  type="number"
  bind:value={maxPrice}
  placeholder={Text.maxPriceFilter}
  min={minPrice}
  max={maxPrice} />
<button on:click={clearPriceFilter}>{Text.clearbtn}</button>

<span>{Text.hotelnameInput}:</span>
<SearchBox
  placeholder={Text.hotelnameInput}
  onTextChange={text => (hotelname = text)}
  bind:this={nameSearch} />

<span>{Text.reviewRatingInput}:</span>
<SearchBox
  placeholder={Text.reviewRatingInput}
  onTextChange={text => (rating = text)}
  bind:this={ratingSearch} />

<button on:click={clearAll}>{Text.clearAllBtn}</button>

<HotelList filter={{ stars, minPrice, maxPrice, hotelname, rating }} {hotels} />
