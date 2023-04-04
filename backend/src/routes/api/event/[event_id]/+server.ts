import { events } from '$db/events';
import { json } from '@sveltejs/kit';

export async function GET({ params }) {
	const eventObj = await events.findOne(
		{ fpa_id: Number(params.event_id) },

	);

	const data = eventObj


	return json(data);
}
