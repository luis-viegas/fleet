import { athleteCompetitions } from '$db/athleteCompetitions';
import { json } from '@sveltejs/kit';

export async function GET({ params }) {
	const competitionsObj = await athleteCompetitions.findOne(
		{ fpa_id: params.id },

	);

	const data = competitionsObj


	return json(data);
}
