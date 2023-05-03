#from dotenv import load_dotenv
#load_dotenv()
from pymongo import MongoClient

from Athlete import Athlete


def main():
    client = MongoClient(
        "mongodb+srv://admin:bananasplit2023@cluster0.7wg412l.mongodb.net/?retryWrites=true&w=majority")

    clubsDB = client["Database"]["Clubs"]
    athletesDB = client["Database"]["Athletes"]
    athleteCompetitionsDB = client["Database"]["AthleteCompetitions"]

    def get_club_id(club_name):
        club = clubsDB.find_one({"acronym": club_name})
        if club:
            return club["fpa_id"]
        else:
            return 0


    #176721
    
    for fpa_id in range(0, 176721):
        fpa_athlete = Athlete.from_fpa_url(fpa_id)
        # adicionar profile picture e competições e club id
        if not fpa_athlete:
            print("Athlete not found")
        else:
            if athletesDB.find_one({"fpa_id": str(fpa_id)}):
                bad_code_practice = 1
            else:
                fpa_athlete.fpa_id = str(fpa_id)
                fpa_athlete.profile_pic = ""
                fpa_athlete.club_id = get_club_id(fpa_athlete.club)
                athletesDB.insert_one(fpa_athlete.__dict__)
                print("Athlete added to database")

                athleteCompetitionsDB.insert_one({"fpa_id": str(fpa_id), "competitions": []})
                print("AthleteCompetitions added to database")










if __name__ == "__main__":
    main()
