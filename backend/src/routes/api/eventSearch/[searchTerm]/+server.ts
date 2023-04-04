
import { json } from '@sveltejs/kit';
import { events } from '$db/events';

export async function GET({ params }) {
	const dataEvents = await events
		.find(
			{ name: { $regex: params.searchTerm, $options: 'i' } },
			{
				limit: 6,
				projection: {
					name: 1,
					association: 1,
					fpa_id: 1,
					_id: {
						$toString: '$_id'
					}
				}
			}
		)
		.toArray();

	const data = {
		events: dataEvents,
	};

	return json(data);
}
