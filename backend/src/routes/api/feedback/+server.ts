
import { json } from '@sveltejs/kit';
import { feedback } from '$db/feedback';

export async function POST({request}) {
    let data = await request.json();
    data.date = new Date();


    await feedback.insertOne(data);



    return json(data);
}
