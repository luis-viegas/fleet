#from dotenv import load_dotenv
#load_dotenv()
from pymongo import MongoClient

from Athlete import Athlete
from CurrentScrapper import past_paralelization_event_aux
from Event import Event


def main():
    client = MongoClient(
        "mongodb+srv://admin:bananasplit2023@cluster0.7wg412l.mongodb.net/?retryWrites=true&w=majority")

    clubsDB = client["Database"]["Clubs"]
    athletesDB = client["Database"]["Athletes"]
    athleteCompetitionsDB = client["Database"]["AthleteCompetitions"]
    eventsDB = client["Database"]["Events"]
    competitionsDB = client["Database"]["Competitions"]

    #event = Event("2420", "Lousada | Campeonato Nacional de Clubes – Apuramento","2023/05/27 - 2023/05/28",  "Complexo Desportivo de Lousada", "AAP",  "https://ddjrr3j94g7u7.cloudfront.net/static/pics/FPA-competicoes_Campeonatos_Nacionais_de_Clubes_Lousada_42KwAbf.png")

    event = Event("2403",
                  "CAMPEONATOS REGIONAIS DE INICIADOS 2023",
                  "2023/05/27 - 2023/05/28",
                  "VENDAS NOVAS",
                  "AAE",
                  "https://ddjrr3j94g7u7.cloudfront.net/static/pics/AAE_rf9MFZj_EChtR90_hPkvUgS_UIOUDu5_VRLIqD3.png")

    a = 1

    past_paralelization_event_aux(event, eventsDB, competitionsDB, athleteCompetitionsDB)









if __name__ == "__main__":
    main()
