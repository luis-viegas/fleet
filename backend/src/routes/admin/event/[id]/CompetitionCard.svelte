<script lang="ts">
	export let id: string;
	let competition: any;
	import { onMount } from 'svelte';

	onMount(async () => {
		const competitionInfo = await fetch(`/api/competition/${id}`);
		competition = await competitionInfo.json();
	});
</script>

{#if competition === undefined}
	<p>Loading...</p>
{:else if competition === null}
	<p>Not found</p>
{:else}
	<p>{competition.name} - {competition.gender[0]}</p>
{/if}
