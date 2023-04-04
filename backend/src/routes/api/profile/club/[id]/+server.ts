import { clubs } from '$db/clubs';
import { json } from '@sveltejs/kit';

export async function GET({ params }) {

	const clubObj2 = await clubs.aggregate([
		// Match the clubs you want to query by some criteria (if applicable)
		{
		  $match: { fpa_id: Number(params.id) }
		},
		// Lookup the athletes collection and populate the athletes array field
		{
		  $lookup: {
			from: "Athletes",
			let: { athleteIds: '$athletes' },
			pipeline: [
			{
				$match: {
				$expr: {
					$in: [ { $toInt: '$fpa_id' }, { $map: { input: "$$athleteIds", in: { $toInt: "$$this" } } } ]
				}
				}
			},
			{
				$project: {
				  _id: 0,
				  fpa_id: 1,
				  name: 1,
				  profile_pic: 1
				}
			  }
			],
			as: "athletes"
		  }
		},

	  ]).toArray();

	console.log(clubObj2[0]);

	const data =  clubObj2[0];

	return json(data);
}
