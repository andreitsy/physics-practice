import pymongo
import logging
import uuid
import datetime
from pydantic import UUID4
from typing import List, Any
from ..db.problems import problems_collection, ProblemCreate, Problem
from ..dependencies import identify_problem_dict
from fastapi import APIRouter, Depends, Response
from ..db.users import User
from .users import fastapi_users

MAX_PROBLEMS_SIZE = 100

logger = logging.getLogger(__name__)

router = APIRouter(
    prefix="/problems",
    tags=["problems"],
    responses={404: {"description": "Not found"}},
)


@router.get("")
async def read_problems(response: Response) -> List[dict[str, Any]]:
    c = problems_collection
    problems_list = list()
    async for p in c.find(
            projection={"_id": False, "solution": False,
                        "description_md": False},
            sort=(("rating", pymongo.DESCENDING),),
            limit=MAX_PROBLEMS_SIZE):
        problems_list.append(p)
    return problems_list


@router.get("/{problem_id}")
async def get_problem(problem_id: UUID4):
    data = await identify_problem_dict(problem_id,
                                       projection={"_id": False,
                                                   "solution": False})
    return data


@router.post("/add",
             responses={403: {"description": "Operation forbidden"}},
             )
async def add_problem(problem_create: ProblemCreate,
                      user: User = Depends(fastapi_users.current_user())):
    logger.info(f"New task is attempting to add {repr(problem_create)}...")
    rating = problem_create.rating if problem_create.rating else 0
    problem_id = uuid.uuid4()
    problem = Problem(id=problem_id, title=problem_create.title,
                      description_md=problem_create.description_md,
                      solution=problem_create.solution,
                      rating=rating,
                      user_id=user.id,
                      time=datetime.datetime.utcnow()
                      )
    result = await problems_collection.insert_one(problem.dict())
    logger.info(f"Added {problem.dict()} to "
                f"user_solutions with {result.inserted_id}")
    return {"problem_id": problem_id}
