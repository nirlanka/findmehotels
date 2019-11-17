<script>
    import HotelList from '../components/HotelList.svelte';
	import SearchBox from '../components/SearchBox.svelte';
	import Text from '../text';

	let stars, price, hotelname, rating;
</script>

<SearchBox placeholder={Text.starRatingInput} onTextChange={text => stars = text} />
<SearchBox placeholder={Text.priceInput} onTextChange={text => price = text} />
<SearchBox placeholder={Text.hotelnameInput} onTextChange={text => hotelname = text} />
<SearchBox placeholder={Text.reviewRatingInput} onTextChange={text => rating = text} />

<HotelList filter={{
    stars, price, hotelname, rating
}} />