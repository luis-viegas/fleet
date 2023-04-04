import type { PageLoad } from '../../$types';
import { athletes } from '$db/athletes';
import { ObjectId } from 'mongodb';
 
export const load = (async ({ fetch, params }) => {
  const athleteInfo = await fetch(`/api/profile/athlete/${params.id}`);
  const athleteCompetitionsInfo = await fetch(`/api/profile/athlete/${params.id}/competitions`);
  const athlete = await athleteInfo.json();
  let athleteCompetitions = await athleteCompetitionsInfo.json();
  athleteCompetitions = athleteCompetitions.competitions;


  return {athlete, athleteCompetitions};
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
		console.log(object)

		return
		await athletes.updateOne(
			{ fpa_id: data.get('fpa_id') },
			{ $set: object },
		);	
		

	}
};