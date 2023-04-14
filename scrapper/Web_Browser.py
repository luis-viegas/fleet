from requests import get
from requests.exceptions import ConnectTimeout, ReadTimeout

from bs4 import BeautifulSoup

def get_webpage(url):
    fpa_url = "https://fpacompeticoes.pt"

    # ? Not sure if this header is necessary
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
    }

    # While we can't get the webpage, try again
    while True:
        try:
            webpage = get(f"{fpa_url}/{url}", headers=headers).text
            break
        except (ConnectTimeout , ReadTimeout):  # Timeout, try again
            continue
        except Exception as e:  # Something else went wrong, not expected tho
            print(e)
            return None

    return BeautifulSoup(webpage, 'html.parser')