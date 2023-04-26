#from dotenv import load_dotenv
#load_dotenv()
from pymongo import MongoClient


def main():
    client = MongoClient(
        "mongodb+srv://admin:bananasplit2023@cluster0.7wg412l.mongodb.net/?retryWrites=true&w=majority")

    clubsDB = client["Database"]["Clubs"]
    athletesDB = client["Database"]["Athletes"]

    ids = athletesDB.find({"club_id": 12})
    for id in ids:
        clubsDB.update_one({"name": "SPORTING C P"}, {"$push": {"athletes": str(id["fpa_id"])}}, upsert=True)



if __name__ == "__main__":
    main()
