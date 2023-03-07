import { MongoClient } from "mongodb";
const uri = process.env.MONGODB_URI;

const options = {};

let mongoClient;

if (!process.env.MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

export async function connectToDatabase() {
  try {
    if (mongoClient) {
      return { mongoClient };
    }
    mongoClient = await new MongoClient(uri, function (err, client) {
      if (err) {
        console.log(err);
      } else {
        console.log("Connected to database ");
      }
    }).connect();

    return { mongoClient };
  } catch (error) {
    console.log(error);
  }
}
