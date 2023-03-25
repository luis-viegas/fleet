from bs4 import BeautifulSoup
from urllib.request import Request, urlopen
import re

import DB_access
from Athlete import Athlete

class Competition:
    def __init__(self, name, round, startTime, level, gender, registered, startlist, results , event_id, event_name, id=None):
        self.name = name
        self.round = round
        self.startTime = startTime
        self.level = level
        self.gender = gender
        self.registered = registered
        self.startlist = startlist
        self.results = results
        self.event_id = event_id
        self.event_name = event_name
        self.id = id

    def add_to_athletes(self, event_name):
        for serie in self.results:
            for result in serie:
                DB_access.add_competition_to_athlete(result[0], event_name, result[1], result[2], self.event_id)

    @staticmethod
    def get_registered(id):
        fpa_url = "https://fpacompeticoes.pt"
        registered_url = f"{fpa_url}/{id}/inscritos"

        registered_req = Request(registered_url, headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'})

        try:
            registered_webpage = urlopen(registered_req).read()
        except Exception as e:
            return []

        registered_soup = BeautifulSoup(registered_webpage, 'html.parser')

        flag = registered_soup.find('div', id='botaoreturn').find('a').attrs['href']
        if (re.search(r'\/\d+\/(\w+)', flag).group(1) == 'associacao'):
            return []

        registered_athletes = registered_soup.findAll('tr')[1:]
        registered = []
        for athlete in registered_athletes:
            if len(athlete.contents[1].contents) == 1:
                continue
            athlete_id = athlete.contents[1].contents[1].attrs['href'][14:]
            pb = athlete.contents[5].text
            registered.append([athlete_id, pb])

        return registered

    @staticmethod
    def get_startlist(id):
        fpa_url = "https://fpacompeticoes.pt"
        startlist_url = f"{fpa_url}/{id}/startlist"

        startlist_req = Request(startlist_url, headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'})

        try:
            startlist_webpage = urlopen(startlist_req).read()
        except Exception as e:
            return []

        startlist_soup = BeautifulSoup(startlist_webpage, 'html.parser')

        flag = startlist_soup.find('div', id ='botaoreturn').find('a').attrs['href']
        if (re.search(r'\/\d+\/(\w+)', flag).group(1) == 'associacao'):
            return []

        startlist_series = startlist_soup.findAll('table')
        startlist = []
        for series in startlist_series:
            serie = series.findAll('tr')[1:]
            serie_startlist = []
            for athlete in serie:
                if len(athlete.contents[5].contents) == 1:
                    continue
                athlete_id = athlete.contents[5].contents[1].attrs['href'][14:]
                track = athlete.contents[1].text
                serie_startlist.append([athlete_id, track])
            startlist.append(serie_startlist)


        return startlist

    @staticmethod
    def get_results(id):
        fpa_url = "https://fpacompeticoes.pt"
        results_url = f"{fpa_url}/{id}/resultados"

        results_req = Request(results_url, headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'})

        try:
            results_webpage = urlopen(results_req).read()
        except Exception as e:
            return []

        results_soup = BeautifulSoup(results_webpage, 'html.parser')

        flag = results_soup.find('div', id='botaoreturn').find('a').attrs['href']
        if (re.search(r'\/\d+\/(\w+)', flag).group(1) == 'associacao'):
            return []

        results_series = results_soup.findAll('table')
        results = []
        for series in results_series:
            serie = series.findAll('tr')[1:]
            serie_results = []
            for athlete in serie:
                if len(athlete.contents[5].contents) == 1:
                    continue
                athlete_id = athlete.contents[5].contents[1].attrs['href'][14:]
                position = athlete.contents[1].text
                score = athlete.contents[11].text.strip()
                serie_results.append([athlete_id, score, position])
            results.append(serie_results)


        return results


    @staticmethod
    def from_fpa_url(id, event_id, name , round , startTime, level, gender, event_name):

        registered = Competition.get_registered(id)
        startlist = Competition.get_startlist(id)
        results = Competition.get_results(id)

        return Competition(name,round,startTime,level,gender,sorted(registered,key= lambda e : e[1]),startlist,results,event_id, event_name, id)

