<script>
	import EventSearchContainer from './EventSearchContainer.svelte';
	import SearchContainer from './NormalSearchContainer.svelte';
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="grid grid-cols-2 gap-10">
	<SearchContainer />
	<EventSearchContainer />
</div>
