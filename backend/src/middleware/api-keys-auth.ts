const API_KEY = 'daa695ad-300a-4ebe-950a-f5e49d1c0f31'; // Replace with your actual API key

export function handleApiKeyAuth(request) {
	const { headers } = request;

	// Check if the API key is provided in the "Authorization" header
	const apiKey = request.headers.get('api_key') || request.headers.get
	console.log(apiKey)
	if (!apiKey || apiKey !== `${API_KEY}`) {
		return {
			status: 401,
			body: 'Unauthorized access, this endpoint is meant to be used by AAL only.'
		};
	}

	// API key is valid, continue with the request
	return;
}
