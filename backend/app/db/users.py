from fastapi_users import models
from fastapi_users.db import MongoDBUserDatabase

from .connection import client_db


class User(models.BaseUser):
    nickname: str


class UserCreate(models.BaseUserCreate):
    nickname: str


class UserUpdate(User, models.BaseUserUpdate):
    nickname: str


class UserDB(User, models.BaseUserDB):
    nickname: str


user_collections = MongoDBUserDatabase(UserDB, client_db["users"])
