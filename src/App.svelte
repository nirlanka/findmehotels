<script>
	import Header from './components/Header.svelte';
	import HotelList from './components/HotelList.svelte';
	import SearchBox from './components/SearchBox.svelte';
	import Text from './text';

	let hotelname;
</script>

<main>
	<Header />
	<SearchBox placeholder={Text.hotelname} onTextChange={text => hotelname = text} />
	<HotelList filter={{
		hotelname,
	}} />
</main>

<style>
	main {
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>