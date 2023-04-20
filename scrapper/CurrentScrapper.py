from Athlete import Athlete
from Club import Club
from urllib.request import Request, urlopen
from pymongo import MongoClient
from bs4 import BeautifulSoup
import time
import datetime as dt
import random
from multiprocessing.pool import ThreadPool as Pool
import threading

from Event import Event
from Web_Browser import get_webpage




def card_to_Event(card):
    event_fpa_id = card.find('a').attrs['href'].split('/')[0]
    event_name = card.find('a').text.strip()
    event_picture = card.find('img').attrs['src']
    event_date = card.find('h5').text.strip()
    event_location = card.find('h4').text.strip()
    event_association = card.find('h6'
                                  '').text.strip()
    event = Event(event_fpa_id, event_name,event_date,  event_location, event_association,  event_picture)
    return event

def run_scrap_homepage_future(eventsDB, competitionsDB):
    while True:
        scrap_homepage_future(eventsDB, competitionsDB)
        print("Future_ ping")
        time.sleep(60*60)

def run_scrap_homepage_past(eventsDB, competitionsDB, athleteCompetitionsDB):
    while True:
        scrap_homepage_past(eventsDB, competitionsDB, athleteCompetitionsDB)
        print("Past_ ping")
        time.sleep(60*60*23)

def run_scrap_homepage_present(eventsDB, competitionsDB , athleteCompetitionsDB):
    while True:
        scrap_homepage_present(eventsDB, competitionsDB, athleteCompetitionsDB)
        print("Present_ ping")
        time.sleep(60*2)



def scrap_homepage_past(eventsDB, competitionsDB, athleteCompetitionsDB):
    soup = get_webpage("")
    past_events = soup.find('div', id='passadas').findAll('div', class_='card')
    past_events = [card_to_Event(card) for card in past_events]
    pool = Pool(5)
    for event in past_events:
        #pool.apply_async(past_paralelization_event_aux, (event, eventsDB, competitionsDB, athleteCompetitionsDB,))
        past_paralelization_event_aux(event, eventsDB, competitionsDB, athleteCompetitionsDB)

    pool.close()
    pool.join()



def scrap_homepage_present(eventsDB, competitionsDB, athleteCompetitionsDB):
    soup = get_webpage("")
    present_events = soup.find('div', class_='d-flex justify-content-around flex-wrap')
    if(all(item in present_events.parent.attrs['class'] for item in ['collapse'])):
        print("Time to scrap present events: 0")
        return
    present_events = present_events.findAll('div', class_='card')
    present_events = [card_to_Event(card) for card in present_events]
    pool = Pool(10)
    start_time = time.time()
    for event in present_events:
        pool.apply_async(past_paralelization_event_aux, (event, eventsDB, competitionsDB, athleteCompetitionsDB,))
        #past_paralelization_event_aux(event, eventsDB, competitionsDB, athleteCompetitionsDB)

    pool.close()
    pool.join()
    print("Time to scrap present events: ", time.time() - start_time)

def scrap_homepage_future(eventsDB, competitionsDB):
    soup = get_webpage("")
    future_events = soup.find('div', id='futuras').findAll('div', class_='card')
    future_events = [card_to_Event(card) for card in future_events]
    pool = Pool(5)
    for event in future_events:
        pool.apply_async(future_paralelization_event_aux, (event, eventsDB, competitionsDB,))
    pool.close()
    pool.join()


def past_paralelization_event_aux(event, eventsDB, competitionsDB, athleteCompetitionsDB):
    event.competitions = event.get_event_competitions()
    for competition in event.competitions:
        test = 2
        if competition.id == "37131":
            a=1
        competitionsDB.update_one({"id": competition.id}, {"$set": competition.__dict__}, upsert=True)
        for serie in competition.results:
            pool = Pool(10)
            for athlete_array in serie:
                pool.apply_async(process_competition_results_aux, (event, athleteCompetitionsDB, competition, athlete_array))
            pool.close()
            pool.join()
    event.replace_competitions_for_ids()
    eventsDB.update_one({"fpa_id": event.fpa_id}, {"$set": event.__dict__}, upsert=True)



def process_competition_results_aux(event, athleteCompetitionsDB, competition, athlete_array):
    athlete_id = athlete_array[0]
    athlete_score = athlete_array[1]
    athlete_position = athlete_array[2]
    competition_result_obj = {"event_name": event.name, "event_id": event.fpa_id, "score": athlete_score,
                              "position": athlete_position, "event_type": competition.competition_type,
                              "competition_id": competition.id}

    athleteCompetitionObj = athleteCompetitionsDB.find_one({"fpa_id": athlete_id})
    if athleteCompetitionObj == None:
        athleteCompetitionObj = {"fpa_id": athlete_id, "competitions": [competition_result_obj]}
        athleteCompetitionsDB.insert_one(athleteCompetitionObj)
        return
    checkIfexists = [comp for comp in athleteCompetitionObj["competitions"] if comp["competition_id"] == competition.id]
    if len(checkIfexists) == 0:
        a = 1
        athleteCompetitionsDB.update_one({"fpa_id": athlete_id},{"$push": {"competitions": competition_result_obj}}, upsert=True)
    else:
        result = [comp for comp in athleteCompetitionObj["competitions"] if comp["competition_id"] != competition.id]
        result.append(competition_result_obj)
        athleteCompetitionsDB.update_one({"fpa_id": athlete_id},{"$set": {"competitions": result}}, upsert=True)


def future_paralelization_event_aux(event, eventsDB, competitionsDB):
    event.competitions = event.get_event_competitions()
    for comp in event.competitions:
        competitionsDB.update_one({"id": comp.id}, {"$set": comp.__dict__}, upsert=True)
    event.replace_competitions_for_ids()
    eventsDB.update_one({"fpa_id": event.fpa_id}, {"$set": event.__dict__}, upsert=True)
    a=1
    a=2


def cyclicMain(eventsDB, competitionsDB, athleteCompetitionsDB):

    future_thread = threading.Thread(target=run_scrap_homepage_future, args=(eventsDB, competitionsDB, ))
    past_tread = threading.Thread(target=run_scrap_homepage_past, args=(eventsDB, competitionsDB,athleteCompetitionsDB,))
    present_tread = threading.Thread(target=run_scrap_homepage_present, args=(eventsDB, competitionsDB,athleteCompetitionsDB,))

    future_thread.start()
    past_tread.start()
    present_tread.start()

    future_thread.join()
    past_tread.join()
    present_tread.join()

def main():
    client = MongoClient(
        "mongodb+srv://admin:bananasplit2023@cluster0.7wg412l.mongodb.net/?retryWrites=true&w=majority")
    clubsDB = client["Database"]["Clubs"]
    athletesDB = client["Database"]["Athletes"]
    eventsDB = client["Database"]["Events"]
    athleteCompetitionsDB = client["Database"]["AthleteCompetitions"]
    competitionsDB = client["Database"]["Competitions"]


    cyclicMain(eventsDB, competitionsDB, athleteCompetitionsDB)

if __name__ == "__main__":
        main()