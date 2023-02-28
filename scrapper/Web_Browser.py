from bs4 import BeautifulSoup
from urllib.request import Request, urlopen

def get_webpage(url):
    fpa_url = "https://fpacompeticoes.pt"

    event_req = Request(f"{fpa_url}/{url}", headers={
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'})

    try:
        event_webpage = urlopen(event_req).read()
    except Exception as e:
        return None

    soup = BeautifulSoup(event_webpage, 'html.parser')

    return soup