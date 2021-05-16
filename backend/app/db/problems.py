from typing import Optional
from datetime import datetime
from pydantic import UUID4, BaseModel
from .connection import client_db


class Problem(BaseModel):
    id: UUID4
    title: str
    description_md: str
    solution: str
    rating: Optional[int]
    user_id: Optional[UUID4]
    time: Optional[datetime]


class ProblemCreate(BaseModel):
    title: str
    description_md: str
    solution: str
    rating: Optional[int]


problems_collection = client_db["problems"]
