<script>
	import AthleteCard from './AthleteCard.svelte';

	export let data;
</script>

<div class="grid grid-cols-2">
	<div class="pr-10">
		<a href="/admin/event/{data.competition?.event_id}"
			><button class="bg-blue-700 text-white text-sm px-2 py-4 rounded mb-4 hover:bg-blue-800"
				>{data.competition?.event_name}
			</button></a
		>
		<form
			method="POST"
			action="?/edit"
			class="border p-4"
			onsubmit="return confirm('Do you really want to change this competition profile?');"
		>
			<h1 class="text-xl font-bold mb-2">Edit competition Information:</h1>
			{#each Object.keys(data.competition) as key}
				<div
					class={key === '_id' || key == 'registered' || key === 'startlist' || key === 'results'
						? 'hidden'
						: ''}
				>
					<div class="  rounded  mb-8">
						<label for={key} class=" block mb-2 font-semibold text-gray-900">{key} : </label>
						<input
							class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5"
							name={key}
							value={data.competition[key]}
						/>
					</div>
				</div>
			{/each}

			<input
				type="submit"
				value="Submit"
				class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
			/>
		</form>
	</div>
	<div class="">
		<h1 class="text-xl font-bold mb-4">Registered:</h1>
		<div class="grid grid-cols-2 gap-4">
			{#each data.competition.registered as registered}
				<a
					class="inline-block  border p-6  hover:bg-gray-100 hover:cursor-pointer"
					href="/admin/athlete/{registered[0]}"
				>
					<AthleteCard id={registered[0]} />
					<p>{registered[1]}</p>
				</a>
			{/each}
		</div>
		<h1 class="text-xl font-bold mb-4">Startlist:</h1>
		<div class="grid grid-cols-2 gap-4">
			{#each data.competition.startlist as serie, index}
				<h1 class="text-lg font-bold mb-4">Serie {index + 1}:</h1>
				{#each serie as registered}
					<a
						class="inline-block  border p-6  hover:bg-gray-100 hover:cursor-pointer"
						href="/admin/athlete/{registered[0]}"
					>
						<AthleteCard id={registered[0]} />
						<p>{registered[1]}</p>
					</a>
				{/each}
			{/each}
		</div>
		<h1 class="text-xl font-bold mb-4">Results:</h1>
		<div class="grid grid-cols-2 gap-4">
			{#each data.competition.results as serie, index}
				<h1 class="text-lg font-bold mb-4">Serie {index + 1}:</h1>
				{#each serie as result}
					<a
						class="inline-block  border p-6  hover:bg-gray-100 hover:cursor-pointer"
						href="/admin/athlete/"
					>
						<AthleteCard id={result[0]} />
						<p>{result[1]}</p>
						<p>{result[2]}</p>
					</a>
				{/each}
			{/each}
		</div>
	</div>
</div>
