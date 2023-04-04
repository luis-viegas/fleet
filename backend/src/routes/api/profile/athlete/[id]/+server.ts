import { athletes } from '$db/athletes';
import { json } from '@sveltejs/kit';

export async function GET({ params }) {
	const athleteObj = await athletes.findOne(
		{ fpa_id: params.id },

	);

	const data = athleteObj


	return json(data);
}
