import { events } from '$db/events';
import { json } from '@sveltejs/kit';


export async function GET() {
    const eventsData = await events
        .find(
            {
                $and: [
                    {dateEnd: { $gte: new Date(Date.now() - 12096e5) }},
                    {dateEnd: { $lte: new Date() }},
                ]

            },
            {
                limit: 20,
            }
        )
        .sort({ dateBegin: -1 })
        .toArray();

    return json(eventsData);


}