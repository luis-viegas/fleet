import { connectToDatabase } from "../../connectToDatabase";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { mongoClient } = await connectToDatabase();
    const db = mongoClient.db("Database");
    const athletes = db.collection("Athletes");
    const clubs = db.collection("Clubs");

    const dataClubs = await clubs
      .find(
        {
          $or: [
            { acronym: { $regex: req.query.searchTerm, $options: "i" } },
            { name: { $regex: req.query.searchTerm, $options: "i" } },
          ],
        },
        {
          limit: 6,
          projection: {
            name: 1,
            association: 1,
            fpa_id: 1,
            _id: {
              $toString: "$_id",
            },
          },
        }
      )
      .toArray();

    const dataAthletes = await athletes
      .find(
        { name: { $regex: req.query.searchTerm, $options: "i" } },
        {
          limit: 6,
          projection: {
            name: 1,
            club: 1,
            fpa_id: 1,
            _id: {
              $toString: "$_id",
            },
          },
        }
      )
      .toArray();

    const data = {
      clubs: dataClubs,
      athletes: dataAthletes,
    };

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({ athlete: JSON.parse(JSON.stringify(data)) });
  }
}
