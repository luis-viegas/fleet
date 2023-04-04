import type { PageLoad } from '../../$types';
import { competitions } from '$db/competitions';
import { ObjectId } from 'mongodb';

 
export const load = (async ({ fetch, params }) => {
  const competitionInfo = await fetch(`/api/competition/${params.id}`);
  const competition = await competitionInfo.json();
  

  return {competition};
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
		

        object.event_id = Number(object.event_id);

        const competition = await competitions.findOne({ _id: new ObjectId(object._id) });
        object.registered = competition.registered;
        object.startlist = competition.startlist;
        object.results = competition.results;

       

		const result = await competitions.updateOne(
			{  _id: new ObjectId(object._id) },
			{ $set: object },
		);	
		

	}
};