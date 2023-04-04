<script>
	export let id;
	let athlete = undefined;
	import { onMount } from 'svelte';

	onMount(async () => {
		const athleteInfo = await fetch(`/api/profile/athlete/${id}`);
		athlete = await athleteInfo.json();
	});
</script>

{#if athlete === undefined}
	<p>Loading...</p>
{:else if athlete === null}
	<p>Not found</p>
{:else}
	<p>{athlete.name}</p>
{/if}
