"""
Class to handle the connection and operations with the MongoDB database
"""
from __future__ import annotations

import os
from dotenv import load_dotenv
load_dotenv()

from pymongo import MongoClient

from typing import List, TYPE_CHECKING

if TYPE_CHECKING:
    from Athlete import Athlete
    from Club import Club
    from Competition import Competition
    from Event import Event

class ClientMongoDB:
    """
    Class that handles the connection to the MongoDB
    """

    def __init__(self, testing=False):
        mongo_url = os.getenv("MONGODB_URL") if not testing else os.getenv("MONGODB_URL_TEST")

        self.client = MongoClient(mongo_url + "/?retryWrites=true&w=majority")

        # Collections
        self.clubs = self.client["Database"]["Clubs"]
        self.athletes = self.client["Database"]["Athletes"]
        self.events = self.client["Database"]["Events"]
        self.athleteCompetitions = self.client["Database"]["AthleteCompetitions"]
        self.competitions = self.client["Database"]["Competitions"]

    ###############################################
    # Clubs
    ###############################################
    def get_clubs(self) -> List[Club]:
        """
        Get all the clubs from the database
        """
        return self.clubs.find()
    
    def update_club(self, fpa_id: int, data: dict) -> None:
        """
        Update the information of a club

        :param fpa_id: The fpa_id of the club
        :param data: The data to update
        """
        self.clubs.update_one({"fpa_id": fpa_id}, {"$set": data})
    
    ###############################################
    # Athletes
    ###############################################
    def get_athletes(self) -> List[Athlete]:
        """
        Get all the athletes from the database
        """
        return self.athletes.find()
    
    ###############################################
    # Events
    ###############################################
    def get_events(self) -> List[Event]:
        """
        Get all the events from the database
        """
        return self.events.find()
    
    ###############################################
    # Competitions
    ###############################################
    def get_competitions(self) -> List[Competition]:
        """
        Get all the competitions from the database
        """
        return self.competitions.find()
        