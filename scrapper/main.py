from dotenv import load_dotenv
load_dotenv()

from mongodb import ClientMongoDB

def main():
    client = ClientMongoDB()

    i=0
    for club in client.get_clubs():
        i = i + 1
        # clubsDB.update_one({"fpa_id": club["fpa_id"]}, {"$set": {"profile_pic": ""}})
        print(i)
    return

if __name__ == "__main__":
    main()
