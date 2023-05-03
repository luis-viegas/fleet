import { clubs } from '$db/clubs';
import { athletes } from '$db/athletes';
import { json } from '@sveltejs/kit';

export async function GET({ params }) {
	const dataClubs = await clubs
		.find(
			{
				$or: [
					{ acronym: { $regex: params.searchTerm, $options: 'i' } },
					{ name: { $regex: params.searchTerm, $options: 'i' } }
				]
			},
			{
				limit: 15,
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

	const dataAthletes = await athletes
		.find(
			{ name: { $regex: params.searchTerm, $options: 'i' } },
			{
				limit: 30,
				projection: {
					name: 1,
					club: 1,
					fpa_id: 1,
					_id: {
						$toString: '$_id'
					}
				}
			}
		)
		.toArray();

	const data = {
		clubs: dataClubs,
		athletes: dataAthletes
	};

	return json(data);
}
