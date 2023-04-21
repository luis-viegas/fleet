<script>
	import AthleteCard from './AthleteCard.svelte';

	export let data;
</script>

<div class="flex justify-between">
	<div class=" w-1/2 pr-10">
		<h1 class="text-xl font-bold mb-2">Edit Athlete Information:</h1>
		{#each Object.keys(data.club) as key}
			<form
				method="POST"
				action="?/edit"
				class={'mb-6 p-4 ' + (key === '_id' || key === 'athletes' ? 'hidden' : '')}
				onsubmit="return confirm('Do you really want to change this athlete profile?');"
			>
				<div>
					<div class="  rounded  mb-8">
						<label for="value" class=" block mb-2 font-semibold text-gray-900">{key} : </label>
						<input
							class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5"
							name="value"
							value={data.club[key]}
						/>
						<input type="hidden" name="id" value={data.club.fpa_id} />
						<input type="hidden" name="key" value={key} />
					</div>
				</div>
				<input
					type="submit"
					value="Submit"
					class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
				/>
			</form>
		{/each}
	</div>
	<div class="w-1/2 text-sm ">
		<h1 class="text-xl font-bold mb-4">Athletes:</h1>
		<div class="grid grid-cols-2 gap-4">
			{#each data.club.athletes as athlete}
				<a
					class="inline-block  border p-6  hover:bg-gray-100 hover:cursor-pointer"
					href="/admin/athlete/{athlete.fpa_id}"
				>
					<AthleteCard id={athlete.fpa_id} />
				</a>
			{/each}
		</div>
	</div>
</div>
