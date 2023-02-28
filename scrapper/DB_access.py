from pymongo import MongoClient


def add_competition_to_athlete(fpa_id, event_name, score, position, event_id):
    client = MongoClient(
        "mongodb+srv://admin:bananasplit2023@cluster0.7wg412l.mongodb.net/?retryWrites=true&w=majority")
    athletesDB = client["Database"]["Athletes"]

    athletesDB.update_one({"fpa_id": fpa_id}, {"$push": {"competitions": {"event_name": event_name, "event_id": event_id , "score": score, "position": position}}})
    print("Added competition to athlete: " + fpa_id)
    client.close()


