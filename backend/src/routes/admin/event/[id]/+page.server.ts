import type { PageLoad } from '../../$types';
import { events } from '$db/events';
import { ObjectId } from 'mongodb';

 
export const load = (async ({ fetch, params }) => {
  const eventInfo = await fetch(`/api/event/${params.id}`);
  const event = await eventInfo.json();
  


  return {event};
}) satisfies PageLoad;

export const actions = {
	edit: async ({ request }) => {
		const data = await request.formData();
		const object = {};
		for (const entry of data.entries()) {
			if (entry[0] === '_id') {
				object[entry[0]] = new ObjectId(entry[1]);
				continue;
			}	
			object[entry[0]] = entry[1];
		}
		object.competitions = object.competitions.split(',');
		object.fpa_id = Number(object.fpa_id);

		const result = await events.updateOne(
			{ fpa_id: Number(data.get('fpa_id')) },
			{ $set: object },
		);	
		

	}
};