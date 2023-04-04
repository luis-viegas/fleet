import { clubs } from '$db/clubs';
import { json } from '@sveltejs/kit';

export async function GET({ params }) {
	const clubObj = await clubs.findOne(
		{ fpa_id: Number(params.id) },

	);

	const data =  clubObj;

	return json(data);
}
