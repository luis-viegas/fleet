import { start_mongo } from '$db/mongo';

start_mongo()
	.then(() => {
		console.log('Mongo started!');
	})
	.catch((err) => {
		console.log(err);
	});
