import { events } from '$db/events';
import { json } from '@sveltejs/kit';


export async function GET() {
    const eventsData = await events
        .find(
            {
                $and: [
                {dateBegin: { $lte: new Date() }},
                {dateEnd: { $gte: new Date() }},
                ]

            }
        )
        .sort({ dateBegin: 1 })
        .toArray();

    return json(eventsData);


}