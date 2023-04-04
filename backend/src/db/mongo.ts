import { MongoClient } from 'mongodb';
import { MONGODB_URI } from '$env/static/private';

if (!MONGODB_URI) {
	throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = MONGODB_URI;
const options = {};

const client = new MongoClient(uri, options);

export function start_mongo() {
	console.log('Starting mongo...');
	return client.connect();
}

export default client.db('Database');
