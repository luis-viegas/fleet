import { competitions } from '$db/competitions';
import { json } from '@sveltejs/kit';

export async function GET({ params }) {
	const compObj = await competitions.findOne(
		{ id: params.comp_id },

	);

	const data = compObj


	return json(data);
}
