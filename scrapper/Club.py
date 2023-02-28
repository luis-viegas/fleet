from bs4 import BeautifulSoup
from urllib.request import Request, urlopen
import re

from Athlete import Athlete


class Club:
    def __init__(self, name, acronym, association, fpa_id=None):
        self.name = name
        self.fpa_id = fpa_id
        self.acronym = acronym
        self.association = association
        self.athletes = []

    @staticmethod
    def from_fpa_url(id, debug=False):
        url_termination = ""
        fpa_url = "https://fpacompeticoes.pt"

        if debug:
            url_termination = ".html"
            fpa_url = "http://127.0.0.1:5501/clone"

        url = f"{fpa_url}/perfilClubes/{id}{url_termination}"
        req = Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'})
        try:
            webpage = urlopen(req).read()
        except Exception as e:
            return None

        soup = BeautifulSoup(webpage, 'html.parser')

        info = soup.find('div', id='profile')

        if info is None:
            return None

        name = re.search(r'Nome : (\S+( \S+)*)', info.text).group(1)
        acronym = re.search(r'Sigla : (\w+)', info.text).group(1)
        association = re.search(r'Associação : (\w+)', info.text).group(1)

        return Club(name, acronym, association, fpa_id=id)

    @staticmethod
    def fpa_club_athletes(id ,debug = False):
        url_termination = ""
        fpa_url = "https://fpacompeticoes.pt"

        if debug:
            url_termination = ".html"
            fpa_url = "http://127.0.0.1:5501/clone"

        url = f"{fpa_url}/perfilClubes/{id}{url_termination}"
        req = Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'})
        try:
            webpage = urlopen(req).read()
        except Exception as e:
            return None

        soup = BeautifulSoup(webpage, 'html.parser')
        text = soup.text
        athletes = soup.findAll('tr')[1:]
        fpa_athletes = []
        for athlete in athletes:
            fpa_id = re.search(r'perfilAtleta/(\d+)', str(athlete)).group(1)
            fpa_athlete = Athlete.from_fpa_url(fpa_id)
            fpa_athletes.append(fpa_athlete)


        return fpa_athletes

