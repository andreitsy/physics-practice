from pydantic import UUID4, BaseModel
from typing import List, Optional

from .connection import client_db


class Solution(BaseModel):
    problem_id: UUID4
    solution_md: str
    answer: str
    correct: Optional[bool]


class UserSolutions(BaseModel):
    user_id: UUID4
    solutions: List[Solution]


solutions_collection = client_db["user_solutions"]
