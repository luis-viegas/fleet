from bs4 import BeautifulSoup
from urllib.request import Request, urlopen
import re

from Nationalities import Nationalities

fpa_url = "http://127.0.0.1:5501"

class Athlete:
    def __init__(self, name, club, level, birth_year, gender, nationality, association, fpa_id=None):
        self.fpa_id = fpa_id
        self.name = name
        self.club = club
        self.club_id = 0
        self.level = level
        self.birth_year = birth_year
        self.gender = 'Male' if gender == 'mars' else 'Female'
        self.nationality = self.convert_nationality(nationality)
        self.association = association


    def convert_nationality(self, nationality):
        if(nationality in Nationalities):
            return Nationalities[nationality]
        else:
            return nationality

    @staticmethod
    def from_fpa_url(id, debug=False):
        url_termination = ""
        fpa_url = "https://fpacompeticoes.pt"

        if debug:
            url_termination = ".html"
            fpa_url = "http://127.0.0.1:5501/clone"

        url = f"{fpa_url}/perfilAtleta/{id}{url_termination}"
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
        club = re.search(r'Clube : (\S+( \S+)*)', info.text).group(1)
        level = re.search(r'Escalão : (\S+( \S+)*) (\(\d+\))', info.text).group(1)
        birth_year = re.search(r'\((\d+)\)', info.text).group(1)
        gender = re.search(r'fas fa-(\w+)', str(info)).group(1)
        nationality = re.search(r'Nacionalidade : (\w+)', info.text).group(1)
        association = re.search(r'Associação : (\w+)', info.text).group(1)

        return Athlete(name, club, level, birth_year, gender , nationality, association, fpa_id=id)
