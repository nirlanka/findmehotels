<script>
  import HotelList from "../components/HotelList.svelte";
  import SearchBox from "../components/SearchBox.svelte";
  import Text from "../text";

  let stars, hotelname, rating;
  let starSearch, nameSearch, ratingSearch;

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
  filter={{ stars, hotelname, rating }} />
