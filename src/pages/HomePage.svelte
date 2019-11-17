<script>
    import HotelList from '../components/HotelList.svelte';
	import SearchBox from '../components/SearchBox.svelte';
	import Text from '../text';

	let hotelname;
</script>

<SearchBox placeholder={Text.hotelname} onTextChange={text => hotelname = text} />
<HotelList filter={{
    hotelname,
}} />