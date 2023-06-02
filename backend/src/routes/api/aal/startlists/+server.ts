import { handleApiKeyAuth } from '$middleware/api-keys-auth';
import { competitions as competitionsDB } from '$db/competitions';

const  AAL_Multiplier = 1000000

export async function POST({request}) {
    
      // Apply the API key authentication middleware
  const authResult = await handleApiKeyAuth(request);
  if (authResult) {
    return new Response(authResult.body, { status: authResult.status });
  }

  const {startlist , id} = await request.json()
  competitionsDB.updateOne({"id": (id*AAL_Multiplier).toString()},{$set: {"startlist": startlist}}, {upsert: true})

  return new Response('Hello AAL!', { status: 200 });
}
