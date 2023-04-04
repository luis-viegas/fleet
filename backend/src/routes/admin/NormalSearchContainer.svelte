<script>
	import Search from './Search.svelte';
	import SearchCard from './SearchCard.svelte';
	let data = {};
	let searchInput = '';
	let searchResults = { clubs: [], athletes: [] };
	let selected = 'athletes';
	$: ({ clubs } = data);
</script>

<div class="container w-full">
	<Search bind:searchInput bind:searchResults />
	<div class="text-column">
		<div class="flex justify-center mb-8">
			<ul class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500">
				<li class="mr-2">
					<a
						href="#"
						class="tab {selected === 'clubs' ? 'selectedTab' : ''}"
						on:click={() => (selected = 'clubs')}
					>
						Clubs
					</a>
				</li>
				<li class="mr-2">
					<a
						href="#"
						class="tab {selected === 'athletes' ? 'selectedTab' : ''}"
						aria-current="page"
						on:click={() => (selected = 'athletes')}
					>
						Athletes
					</a>
				</li>
			</ul>
		</div>
		{#if selected === 'clubs'}
			{#each searchResults.clubs as club}
				<SearchCard name={club.name} entity={club.association} id={club.fpa_id} type="club" />
			{/each}
		{:else if selected === 'athletes'}
			{#each searchResults.athletes as athlete}
				<SearchCard name={athlete.name} entity={athlete.club} id={athlete.fpa_id} type="athlete" />
			{/each}
		{/if}
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
