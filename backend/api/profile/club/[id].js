import { connectToDatabase } from "../../../connectToDatabase";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { mongoClient } = await connectToDatabase();
  const db = mongoClient.db("Database");
  const athletes = db.collection("Clubs");

  const data = await athletes.findOne(
    { _id: new ObjectId(req.query.id) },
    {
      _id: {
        $toString: "$_id",
      },
    }
  );

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json({ athlete: JSON.parse(JSON.stringify(data)) });
}
