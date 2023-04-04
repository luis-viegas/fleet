<script lang="ts">
	export let searchInput;
	export let searchResults;
	export let placeholder: string = 'Search for clubs, athletes...';

	async function search() {
		if (searchInput.length == 0) return;
		fetch('api/search/' + searchInput)
			.then((response) => response.json())
			.then((data) => {
				searchResults = data;
			});
	}
</script>

<form autocomplete="off">
	<label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
	<div class="relative">
		<input
			bind:value={searchInput}
			on:input={search}
			type="search"
			id="default-search"
			autocomplete="off"
			class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
			{placeholder}
			required
		/>
		<button
			on:click={search}
			type="submit"
			class="hidden text-white absolute right-2.5 bottom-2.5 bg-[color:var(--primary-pink)] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
			>Search</button
		>
	</div>
</form>
