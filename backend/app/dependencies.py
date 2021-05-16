import logging
from fastapi import HTTPException
from fastapi_users.authentication import JWTAuthentication
from pydantic import UUID4
from typing import Dict, Any
from .config import settings
from .db.user_solutions import UserSolutions, solutions_collection, Solution
from .db.problems import problems_collection, Problem
from .db.connection import client
from .internal.problems_tools.check_solution import compare_solutions, \
    parse_expr

jwt_authentication = JWTAuthentication(
    secret=settings.SECRET, lifetime_seconds=3600, tokenUrl="/auth/jwt/login"
)

logger = logging.getLogger(__file__)


async def add_entity_user_solutions(user_id: UUID4):
    """
    Add new user solutions entity for new user
    :param user_id:
    :return:
    """
    user_solutions = UserSolutions(user_id=user_id, solutions=[])
    result = await solutions_collection.insert_one(user_solutions.dict())
    logger.info(f"Added {user_solutions.dict()} to "
                f"user_solutions with {result.inserted_id}")


def parse_and_compare_solution(user_solution: str, etalon_solution: str):
    """
    Parse and compare solutions at the same time
    :param user_solution:
    :param etalon_solution:
    :return:
    """
    expr_user = parse_expr(user_solution)
    expr_etalon = parse_expr(etalon_solution)
    return compare_solutions(expr_user, expr_etalon)


async def add_new_solution(solution: Solution, user_id: UUID4):
    """
    Adding new solution to existing entry of user solutions in MongoDb
    """
    async with await client.start_session() as s:
        async with s.start_transaction():
            user_dict = await solutions_collection. \
                find_one({"user_id": user_id})
            if not user_dict:
                logger.warning("Missing solutions collection with id %s",
                               repr(user_id))
                await add_entity_user_solutions(user_id)
                user_dict = await solutions_collection. \
                    find_one({"user_id": user_id})

            logger.info(f"Found solutions for user {repr(user_dict)}")
            result = await solutions_collection.update_one(
                {"_id": user_dict["_id"]},
                {"$push": {'solutions': solution.dict()}})
            logger.info(f"Updated {solution.dict()} "
                        f"for {repr(result)}")


async def identify_problem_dict(problem_id: UUID4,
                                projection: Dict[str, bool] = None) \
        -> Dict[str, Any]:
    """
    This function looking for problem by id in database
    :param projection: a dict specifying the fields to include or exclude
    :param problem_id: UUID4 id
    :return:
    """
    problem_dict = await problems_collection.find_one(
        {"id": problem_id},
        projection=projection)
    if not problem_dict:
        logger.error("Missing problem with id %s",
                     repr(problem_id))
        raise HTTPException(status_code=404, detail="Problem not found")
    return problem_dict
