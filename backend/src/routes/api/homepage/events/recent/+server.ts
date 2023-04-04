import { events } from '$db/events';
import { json } from '@sveltejs/kit';


export async function GET() {
    const eventsData = await events
        .find(
            {
                $and: [
                    {dateBegin: { $gte: new Date(Date.now() - 12096e5) }},
                    {dateBegin: { $lte: new Date() }},
                ]

            },
            {
                limit: 20,
            }
        )
        .toArray();

    return json(eventsData);


}