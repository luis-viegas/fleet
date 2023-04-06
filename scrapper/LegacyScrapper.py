from Athlete import Athlete
from Club import Club
from urllib.request import Request, urlopen
from pymongo import MongoClient
from bs4 import BeautifulSoup
import time
import random

from Event import Event
from Web_Browser import get_webpage


def main():
    client = MongoClient(
        "mongodb+srv://admin:bananasplit2023@cluster0.7wg412l.mongodb.net/?retryWrites=true&w=majority")
    clubsDB = client["Database"]["Clubs"]
    athletesDB = client["Database"]["Athletes"]
    eventsDB = client["Database"]["Events"]
    athleteCompetitionsDB = client["Database"]["AthleteCompetitions"]
    competitionsDB = client["Database"]["Competitions"]
    print("Connected to DB")

    for i in range(1961, 2200):
        print("Crawling event: " + str(i))
        crawl_event_url(i, eventsDB, competitionsDB, athleteCompetitionsDB)

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


def crawl_event_url(event_id, eventsDB, competitionsDB, athleteCompetitionsDB):
    try:
        event = Event.from_fpa_url(event_id)
    except Exception as e:
        print(e)
        return None
    if event == None:
        return None

    competitions = event.competitions

    event.replace_competitions_for_ids()
    eventsDB.update_one({"fpa_id": event_id}, {"$set": event.__dict__}, upsert=True)

    for competition in competitions:
        competitionsDB.update_one({"id": competition["id"]}, {"$set": competition}, upsert=True)
        for serie in competition["results"]:
            for athlete_array in serie:
                athlete_id = athlete_array[0]
                athlete_score = athlete_array[1]
                athlete_position = athlete_array[2]
                competition_result_obj = {"event_name": event.name, "event_id": event_id , "score": athlete_score, "position": athlete_position, "event_type": competition["competition_type"], "competition_id": competition["id"]}
                athleteCompetitionsDB.update_one({"fpa_id": athlete_id}, {"$push": {"competitions": competition_result_obj}},upsert=True)





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


def crawl_DB_athletes(athletesDB, athletesCompetitionsDB): #Crawl DB athletes and add them the competition ID
    for athlete in athletesDB.find():
        fpa_id = athlete["fpa_id"]
        athlete_dict = {}
        fpa_athlete = Athlete.from_fpa_url(fpa_id, debug=False)
        competitions = fpa_athlete.get_competitions()
        for comp in competitions:
            comp_id = comp.find('a').attrs['href'].split('/')[1]
            comp_score = comp.findAll('td')[1].text.strip()
            comp_position = comp.findAll('td')[2].text.strip()
            comp_soup = get_webpage(f"{comp_id}/resultados")
            event_id = comp_soup.find('div', id='botaoreturn').find('a').attrs['href'].split('/')[1]
            athlete_dict[comp_id] = [event_id, comp_score, comp_position]

        athlete_competitions = athletesCompetitionsDB.find_one({"fpa_id": str(fpa_id)})

        result = []
        for item in athlete_competitions["competitions"]:
            event_id = item["event_id"]
            comp_score = item["score"]
            comp_position = item["position"]
            for key in athlete_dict.keys():
                value = athlete_dict[key]
                if value[0] == str(event_id) and value[1] == comp_score and value[2] == comp_position:
                    item["competition_id"] = key
                    result.append(item)
                    break

        print(result)
        athletesCompetitionsDB.update_one({"fpa_id": fpa_id}, {"$set": athlete_competitions.__dict__}, upsert=True)


def competition_entry_athlete_page(soup):
    type = soup.findAll('td')[0].text.strip()
    score = soup.findAll('td')[1].text.strip()
    position = soup.findAll('td')[2].text.strip()
    club = soup.findAll('td')[3].text.strip()
    date = soup.findAll('td')[4].text.strip()
    id = soup.find('a').attrs['href'].split('/')[1]
    return {"type": type, "score": score, "position": position, "club": club, "date": date, "id": id}

def crawl_DB_athletes_competition_type(athletesDB, athletesCompetitionsDB):  # Crawl DB athletes and add them the competition type
    i = 0
    for athlete in athletesDB.find():
        fpa_id = athlete["fpa_id"]
        try:
            athlete_dict = {}
            fpa_athlete = Athlete.from_fpa_url(fpa_id, debug=False)
            competitions = fpa_athlete.get_competitions()

            athlete_page_competitions = {}
            for comp in competitions:
                temp = competition_entry_athlete_page(comp)
                athlete_page_competitions[temp["id"]] = temp

            athlete_competitions = athletesCompetitionsDB.find_one({"fpa_id": str(fpa_id)})


            new_competitions = []
            for comp in athlete_competitions["competitions"]:
                competition_id = comp["competition_id"]
                comp["event_type"] = athlete_page_competitions[competition_id]["type"]
                new_competitions.append(comp)


            print(new_competitions)
            athletesCompetitionsDB.update_one({"fpa_id": str(fpa_id)}, {"$set": {"competitions": new_competitions}}, upsert=True)
            print(i)
            i = i+1
        except:
            write_progress(str(fpa_id))


def extract_competitions_DB(EventsDB, CompetitionsDB):
    i = 0
    for event in EventsDB.find():
        event_id = event["fpa_id"]
        competitions = event["competitions"]
        new_competitions = []
        for comp in competitions:
            new_competitions.append(comp["id"])
            CompetitionsDB.insert_one(comp)
        EventsDB.update_one({"fpa_id": event_id}, {"$set": {"competitions": new_competitions}}, upsert=True)
        i = i+1
        print(i)




if __name__ == "__main__":
    main()
