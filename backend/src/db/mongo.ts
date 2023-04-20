import { MongoClient } from 'mongodb';
import { MONGODB_URI } from '$env/static/private';

if (!MONGODB_URI) {
	throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = MONGODB_URI;
const options = {};

const client = new MongoClient(uri, options);

export async function start_mongo() {
	console.log('Starting mongo...');
	let result;
	try {
		// Connect to the MongoDB cluster
		result = await client.connect();
	
	} catch (e) {
		console.error(e);
	}
	return result;
}

export default client.db('Database');
