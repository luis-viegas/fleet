import { connectToDatabase } from "../../../../connectToDatabase";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { mongoClient } = await connectToDatabase();
  const db = mongoClient.db("Database");
  const clubs = db.collection("Clubs");
  const athletes = db.collection("Athletes");

  let data = await clubs.findOne(
    { _id: new ObjectId(req.query.id) },
    {
      _id: {
        $toString: "$_id",
      },
    }
  );

  data = data.athletes;
  let data2 = [];

  for (let i = 0; i < data.length; i++) {
    data2.push(
      await athletes.findOne(
        { fpa_id: data[i] },
        {
          _id: {
            $toString: "$_id",
          },
        }
      )
    );
  }

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json(JSON.parse(JSON.stringify(data2)));
}
