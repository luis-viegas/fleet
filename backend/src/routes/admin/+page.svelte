<script>
	import { onMount } from 'svelte';
	import EventSearchContainer from './EventSearchContainer.svelte';
	import SearchContainer from './NormalSearchContainer.svelte';

	let showRecent = false;
	let showActive = false;
	let showUpcoming = false;

	export let recent;
	export let active;
	export let upcoming;
	async function getEvents() {
		fetch('api/homepage/events/recent')
			.then((response) => response.json())
			.then((data) => {
				recent = data;
			});

		fetch('api/homepage/events/active')
			.then((response) => response.json())
			.then((data) => {
				active = data;
			});

		fetch('api/homepage/events/upcoming')
			.then((response) => response.json())
			.then((data) => {
				upcoming = data;
			});
	}

	onMount(() => {
		getEvents();
	});
</script>

<h1 class="text-2xl font-bold mb-2">Events</h1>
<div class="mb-6">
	<div
		class={'w-full bg-gray-400 text-white p-2 rounded-lg hover:bg-gray-600 mb-5 '}
		on:click={() => (showRecent = !showRecent)}
	>
		<h1 class="text-2xl font-bold">Recent :</h1>
	</div>
	{#if recent}
		<div class={'grid grid-cols-4 gap-2 ' + (showRecent ? '' : 'hidden')}>
			{#each recent as event}
				<div class="border rounded bg-gray-50 hover:bg-gray-300 p-4">
					<h1 class="font-semibold mb-2">{event.name}</h1>
					<h1 class="text-sm">{event.location}</h1>
				</div>
			{/each}
		</div>
	{/if}
</div>

<div class="mb-6">
	<div
		class={'w-full bg-gray-400 text-white p-2 rounded-lg hover:bg-gray-600 mb-5 '}
		on:click={() => (showActive = !showActive)}
	>
		<h1 class="text-2xl font-bold">Active :</h1>
	</div>
	{#if active}
		<div class={'grid grid-cols-4 gap-2 ' + (showActive ? '' : 'hidden')}>
			{#each active as event}
				<div class="border rounded bg-gray-50 hover:bg-gray-300 p-4">
					<h1 class="font-semibold mb-2">{event.name}</h1>
					<h1 class="text-sm">{event.location}</h1>
				</div>
			{/each}
		</div>
	{/if}
</div>

<div class="mb-6">
	<div
		class={'w-full bg-gray-400 text-white p-2 rounded-lg hover:bg-gray-600 mb-5 '}
		on:click={() => (showUpcoming = !showUpcoming)}
	>
		<h1 class="text-2xl font-bold">Upcoming :</h1>
	</div>
	{#if upcoming}
		<div class={'grid grid-cols-4 gap-2 ' + (showUpcoming ? '' : 'hidden')}>
			{#each upcoming as event}
				<div class="border rounded bg-gray-50 hover:bg-gray-300 p-4">
					<h1 class="font-semibold mb-2">{event.name}</h1>
					<h1 class="text-sm">{event.location}</h1>
				</div>
			{/each}
		</div>
	{/if}
</div>

<h1 class="text-2xl font-bold">Search</h1>
<div class="grid grid-cols-2 gap-10">
	<SearchContainer />
	<EventSearchContainer />
</div>
