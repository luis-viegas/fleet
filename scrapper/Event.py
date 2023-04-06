from bs4 import BeautifulSoup
from datetime import datetime
from urllib.request import Request, urlopen
import time
import random
from Competition import Competition
from Web_Browser import get_webpage
from multiprocessing.pool import ThreadPool as Pool

class Event:
    def __init__(self, fpa_id, name, date, location, association, picture, competitions=[], legacy=False):
        self.fpa_id = fpa_id
        self.name = name
        self.legacy = legacy
        self.dateBegin, self.dateEnd = self.convert_date(date)
        self.location = location
        self.association = association
        self.picture = picture
        self.competitions = competitions


    def convert_date(self, date):

        if self.legacy:
            dateBegin = datetime.strptime(date, '%m/%Y')
            return dateBegin, dateBegin

        date = date.split(' - ')
        dateBegin = datetime.strptime(date[0].strip(), '%Y/%m/%d')
        if (len(date) > 1):
            dateEnd = datetime.strptime(date[1].strip(), '%Y/%m/%d')
            dateEnd = dateEnd.replace(hour=23, minute=59, second=59)
        else:
            dateEnd = dateBegin.replace(hour=23, minute=59, second=59)
        return dateBegin, dateEnd


    def parallel_aux_get_event_competitions(self, row, roundNumber, competitions):
        competition_id = None if (row.find('a') == None) else row.find('a').attrs['href'].split('/')[2]
        if competition_id == None:
            return
        competition_name = row.contents[3].text.split(' | ')[0].strip()
        competition_round = roundNumber
        competition_startTime = row.contents[1].text.strip()
        competition_level = row.contents[5].text.strip()
        competition_gender = 'Female' if (
                row.contents[7].contents[1].attrs['class'][1].split('-')[1] == 'venus') else 'Male'
        sleep_time = random.randint(1, 3)
        time.sleep(sleep_time)
        competition = Competition.from_fpa_url(competition_id, self.fpa_id, competition_name, competition_round,
                                               competition_startTime, competition_level, competition_gender, self.name)
        competitions.append(competition)

    def get_event_competitions(self):

        event_soup = get_webpage(f"{self.fpa_id}/competicao")

        tables = event_soup.findAll('div', class_='table-responsive')
        rounds = event_soup.findAll('h3')
        competitions = []
        for table, round in zip(tables, rounds):
            rows = table.findAll('tr')[1:]
            roundNumber = round.text.strip().split(' ')[1]
            pool = Pool(10)
            for row in rows:
                pool.apply_async(self.parallel_aux_get_event_competitions, (row, roundNumber, competitions,))

            pool.close()
            pool.join()


        return competitions

    @staticmethod
    def find_date_location(competition_id, event_name):

        results_soup = get_webpage(f"{competition_id}/resultados")
        athlete_url = results_soup.findAll('tr')[1].find('a').attrs['href'][1:]
        time.sleep(random.randint(1, 3))
        athlete_soup = get_webpage(athlete_url)
        results = athlete_soup.find('div', {'id': 'ultimas'}).findAll('tr')[1:]
        for result in results:
            if (result.find('a').text.strip() == event_name):
                check_results_soup = get_webpage(result.find('a').attrs['href'][1:])
                if (str(check_results_soup) == str(results_soup)):
                    date = result.findAll('td')[4].text.strip()
                    location = result.findAll('td')[5].text.strip()
                    return date, location
        return None, None

    def replace_competitions_for_ids(self):
        result = []
        for competition in self.competitions:
            try:
                result.append(competition.id)
            except:
                result.append(competition['id'])
        self.competitions = result

    @staticmethod
    def from_fpa_url(id):

        event_soup = get_webpage(f"{id}/competicao")
        if event_soup == None:
            return None

        name = event_soup.find('title').text.strip()

        competition_id = event_soup.findAll('tr')[1].findAll('a')[2].attrs['href'].split('/')[2]
        date, location = Event.find_date_location(competition_id, name)

        association = event_soup.findAll('h5')[1].text.strip()

        picture = None

        event = Event(id, name, date, location, association, picture, competitions=[], legacy=True)

        competitions = event.get_event_competitions()

        for competition in competitions:
            event.competitions.append(competition.__dict__)

        return event
