import { handleApiKeyAuth } from '$middleware/api-keys-auth';

export async function POST({request}) {
    
      // Apply the API key authentication middleware
  const authResult = await handleApiKeyAuth(request);
  if (authResult) {
    return new Response(authResult.body, { status: authResult.status });
  }


    return new Response('Hello AAL!', { status: 200 });
}
