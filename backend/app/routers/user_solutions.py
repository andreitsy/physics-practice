import logging
from fastapi import APIRouter, Depends, HTTPException

from .users import fastapi_users
from ..db.user_solutions import Solution, solutions_collection
from ..db.users import User
from ..db.problems import Problem
from ..dependencies import parse_and_compare_solution, identify_problem_dict, \
    add_new_solution


logger = logging.getLogger(__name__)

router = APIRouter(
    prefix="/user_solutions",
    tags=["user_solutions"],
    responses={404: {"description": "Not found"}},
)


@router.get("/")
async def read_solutions(user: User = Depends(fastapi_users.current_user())):
    user_dict = await solutions_collection.find_one({"user_id": user.id})
    return user_dict["solutions"]


@router.put(
    "/add_solution",
    tags=["custom"],
    responses={403: {"description": "Operation forbidden"}},
)
async def add_solution(user_solution: Solution,
                       user: User = Depends(fastapi_users.current_user())):
    problem_dict = await identify_problem_dict(user_solution.problem_id,
                                               projection=None)
    problem = Problem(**problem_dict)
    try:
        is_correct = parse_and_compare_solution(user_solution.answer,
                                                problem.solution)
        logger.info(f"Solution is correct? {is_correct}")
    except Exception as e:
        logger.error("Cannot compare results with user answer: `%s` "
                     "and system answer `%s`",
                     repr(user_solution.answer), repr(problem.solution),
                     exc_info=True)
        raise HTTPException(status_code=422,
                            detail="Parse error with solution, %s "
                                   "internal error" % user_solution.answer)
    else:
        user_solution.correct = is_correct
        await add_new_solution(user_solution, user.id)
        return {"result": is_correct}
