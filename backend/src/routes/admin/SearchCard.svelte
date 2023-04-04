<script>
	export let name;
	export let entity;
	export let id;
	export let type;
</script>

<a
	href="admin/{type}/{id}"
	class="block p-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 mb-3"
>
	<h5 class="text-base font-bold tracking-tight text-gray-900">{name}</h5>
	<p class="font-normal text-sm text-gray-700">{entity}</p>
</a>
