import type { PageLoad } from '../../$types';
import { clubs } from '$db/clubs';
import { ObjectId } from 'mongodb';
 
export const load = (async ({ fetch, params }) => {
  const clubInfo = await fetch(`/api/profile/club/${params.id}`);
  const club = await clubInfo.json();
  return {club};
}) satisfies PageLoad;

export const actions = {
    edit: async ({ request }) => {

    
        const data = await request.formData();

        
        


		let object = {};
		const keyValue = data.get('key');
		const value = data.get('value');
		object[keyValue] = value;

        
        const result = await clubs.updateOne(
            { fpa_id: Number(data.get('id')) },
			{ $set: object },
        ); 
        return
        /*

        for (const entry of data.entries()) {
            if (entry[0] === '_id') {
                object[entry[0]] = new ObjectId(entry[1]);
                continue;
            }	
            object[entry[0]] = entry[1];
        }

        object.fpa_id = Number(object.fpa_id);
        object.athletes = object.athletes.split(',').map(Number);
        const result = await clubs.updateOne(
            { fpa_id: Number(data.get('fpa_id')) },
            { $set: object },
        );		
        */
    }
};