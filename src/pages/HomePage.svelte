<script>
  import HotelList from "../components/HotelList.svelte";
  import SearchBox from "../components/SearchBox.svelte";
  import Text from "../text";

  let stars, minPrice, maxPrice, hotelname, rating;
  let starSearch, priceSearch, nameSearch, ratingSearch;

  function clearPriceFilter() {
    minPrice = '';
    maxPrice = '';
  }

  function clearAll() {
    stars = price = hotelname = rating = "";
    starSearch.clearText();
    starSearch.clearText();
    starSearch.clearText();
    starSearch.clearText();
  }
</script>

<SearchBox
  placeholder={Text.starRatingInput}
  onTextChange={text => (stars = text)}
  bind:this={starSearch} />

<input type="text" 
  bind:value={minPrice}
  placeholder={Text.minPriceFilter} />
<input type="text" 
  bind:value={maxPrice}
  placeholder={Text.maxPriceFilter} />
<button on:click={clearPriceFilter}>{Text.clearbtn}</button>

<SearchBox
  placeholder={Text.hotelnameInput}
  onTextChange={text => (hotelname = text)}
  bind:this={nameSearch} />
<SearchBox
  placeholder={Text.reviewRatingInput}
  onTextChange={text => (rating = text)}
  bind:this={ratingSearch} />

<button on:click={clearAll}>{Text.clearAllBtn}</button>

<HotelList
  filter={{ stars, minPrice, maxPrice, hotelname, rating }} />
