<script>
	import EventSearch from './EventSearch.svelte';
	import SearchCard from './SearchCard.svelte';
	let data = {};
	let searchInput = '';
	let searchResults = { events: [] };
	let selected = 'athletes';
	$: ({ clubs } = data);
</script>

<div class="container w-full">
	<EventSearch placeholder="Search for events..." bind:searchInput bind:searchResults />
	<div class="text-column">
		{#each searchResults.events as event}
			<SearchCard name={event.name} entity={event.association} id={event.fpa_id} type="event" />
		{/each}
	</div>
</div>

<style>
	.container {
		padding-top: 1em;
	}

	.tab {
		display: inline-flex;
		padding: 1rem;
		border-bottom-width: 2px;
		border-color: transparent;
		border-top-left-radius: 0.5rem;
		border-top-right-radius: 0.5rem;
	}

	.selectedTab {
		--tw-text-opacity: 1;
		color: red;
		--tw-border-opacity: 1;
		border-color: red;
	}
</style>
