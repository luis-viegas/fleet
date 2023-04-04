import { events } from '$db/events';
import { json } from '@sveltejs/kit';


export async function GET() {
    const eventsData = await events
        .find(
            {
                $and: [
                {dateBegin: { $gte: new Date() }},
                {dateEnd: { $lte: new Date() }},
                ]

            }
        )
        .toArray();

    return json(eventsData);


}