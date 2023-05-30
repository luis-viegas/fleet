import { athleteCompetitions } from '$db/athleteCompetitions';
import { json } from '@sveltejs/kit';

export async function GET({ params }) {
	const competitionsObj = await athleteCompetitions.findOne(
		{ fpa_id: params.id },

	);

	let data = competitionsObj

	data?.competitions.sort((a, b) => b.event_id - a.event_id);


	return json(data);
}
