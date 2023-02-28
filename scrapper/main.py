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

    athletesDB.update_many({}, {"$set": {"competitions": []}})




if __name__ == "__main__":
    main()
