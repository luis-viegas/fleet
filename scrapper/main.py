from urllib.request import Request, urlopen
from bs4 import BeautifulSoup
from Event import Event
from Competition import Competition
import json
from pymongo import MongoClient


def main():

    client = MongoClient(
        "mongodb+srv://admin:bananasplit2023@cluster0.7wg412l.mongodb.net/?retryWrites=true&w=majority")
    clubsDB = client["Database"]["Clubs"]
    athletesDB = client["Database"]["Athletes"]
    eventsDB = client["Database"]["Events"]
    athleteCompetitionsDB = client["Database"]["AthleteCompetitions"]
    competitionsDB = client["Database"]["Competitions"]

    i=0
    for club in clubsDB.find():
        i = i + 1
        clubsDB.update_one({"fpa_id": club["fpa_id"]}, {"$set": {"profile_pic": ""}})
        print(i)
    return





if __name__ == "__main__":
    main()
