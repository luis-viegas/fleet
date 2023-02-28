from Club import Club
from urllib.request import Request, urlopen
from pymongo import MongoClient
from bs4 import BeautifulSoup
import time
import random

from Event import Event


def main():



    client = MongoClient("mongodb+srv://admin:bananasplit2023@cluster0.7wg412l.mongodb.net/?retryWrites=true&w=majority")
    clubsDB = client["Database"]["Clubs"]
    athletesDB = client["Database"]["Athletes"]
    eventsDB = client["Database"]["Events"]

    for i in range(1, 1967):
        crawl_event_url(i, eventsDB)
        time.sleep(random.randint(1, 2))

    # crawl_homepage_events(eventsDB)



    client.close()

def crawl_homepage_events(eventsDB):
    fpa_url = "https://fpacompeticoes.pt"

    homepage_req = Request(fpa_url, headers={
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'})

    try:
        homepage_webpage = urlopen(homepage_req).read()
    except Exception as e:
        return []

    homepage_soup = BeautifulSoup(homepage_webpage, 'html.parser')

    cards = homepage_soup.findAll('div', class_='card')

    for card in cards:
        event_id = card.find('a').attrs['href'].split('/')[0]
        event_name = card.find('h3').text.strip()
        event_date = card.find('h5').text.strip()
        event_location = card.find('h4').text.strip()
        event_association = card.find('h6').text.strip()
        event_picture = card.find('img').attrs['src']

        event = Event(event_id, event_name, event_date, event_location, event_association, event_picture)
        event_competitions = event.get_event_competitions()
        for competition in event_competitions:
            event.competitions.append(competition.__dict__)
        eventsDB.update_one({"fpa_id": event_id}, {"$set": event.__dict__}, upsert=True)

def crawl_event_url(event_id, eventsDB):
    try:
        event = Event.from_fpa_url(event_id)
    except Exception as e:
        print(e)
        return None
    if event == None:
        return None

    eventsDB.update_one({"fpa_id": event_id}, {"$set": event.__dict__}, upsert=True)


def crawl_clubs(clubsDB):
    for i in range(1, 1150):
        club = Club.from_fpa_url(i, debug=True)
        if club is not None:
            clubsDB.update_one({"fpa_id": club.fpa_id}, {"$set": club.__dict__}, upsert=True)

        write_progress(str(i))
        print(i)
        sleep_time = random.randint(1, 7)
        time.sleep(sleep_time)

def crawl_club_athletes(clubsDB, athletesDB, club_id):
    athletes = Club.fpa_club_athletes(club_id, debug=False)
    for athlete in athletes:
        athlete.club_id = club_id
        print(athlete.__dict__)
        athletesDB.update_one({"fpa_id": athlete.fpa_id}, {"$set": athlete.__dict__}, upsert=True)
        sleep_time = random.randint(1, 7)
        time.sleep(sleep_time)

    club = Club.from_fpa_url(club_id, debug=False)
    athletes_ids = [athlete.fpa_id for athlete in athletes]
    club.athletes = athletes_ids

    clubsDB.update_one({"fpa_id": club_id}, {"$set": club.__dict__})


def crawl_athletes(clubsDB, athletesDB):
    for i in range(1, 1150):
        club = Club.from_fpa_url(i, debug=False)
        if club is not None:
            crawl_club_athletes(clubsDB, athletesDB, club.fpa_id)
        write_progress(str(i))
        print(i)


def write_progress(progress):
    with open("progress.txt", "a") as f:
        f.write(progress)
        f.write("\n")


if __name__ == "__main__":
    main()