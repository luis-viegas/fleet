<script>
	export let data;
</script>

<div class="flex justify-between">
	<div class=" w-1/2 pr-10">
		<form
			method="POST"
			action="?/edit"
			class="border p-4"
			onsubmit="return confirm('Do you really want to change this athlete profile?');"
		>
			<h1 class="text-xl font-bold mb-2">Edit Athlete Information:</h1>
			{#each Object.keys(data.athlete) as key}
				<div class={key === '_id' ? 'hidden' : ''}>
					<div class="  rounded  mb-8">
						<label for={key} class=" block mb-2 font-semibold text-gray-900">{key} : </label>
						<input
							class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5"
							name={key}
							value={data.athlete[key]}
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
	<div class="w-1/2 text-sm ">
		<h1 class="text-xl font-bold mb-4">Events:</h1>
		<div class="grid grid-cols-2 gap-4">
			{#each data.athleteCompetitions as competition}
				<a
					class="inline-block  border p-6  hover:bg-gray-100 hover:cursor-pointer"
					href="/admin/competition/{competition.competition_id}"
				>
					{#each Object.keys(competition) as key}
						<div class={key === '_id' ? 'hidden' : 'mb-1'}>
							<div>
								<p class="inline font-semibold text-gray-900">{key} :</p>
								<p class="inline">{competition[key]}</p>
							</div>
						</div>
						<hr />
					{/each}
				</a>
			{/each}
		</div>
	</div>
</div>
