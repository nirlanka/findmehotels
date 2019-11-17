<script>
	import Header from './components/Header.svelte';
	import HotelList from './components/HotelList.svelte';
</script>

<main>
	<Header />
	<HotelList />
</main>

<style>
	main {
		text-align: center;
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