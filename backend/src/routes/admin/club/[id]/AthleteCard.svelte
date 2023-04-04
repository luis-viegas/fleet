<script>
	export let id;
	let athlete;
	import { onMount } from 'svelte';

	onMount(async () => {
		const athleteInfo = await fetch(`/api/profile/athlete/${id}`);
		athlete = await athleteInfo.json();
	});
</script>

{#if athlete === undefined}
	<p>Loading...</p>
{:else}
	<p>{athlete.name}</p>
{/if}
