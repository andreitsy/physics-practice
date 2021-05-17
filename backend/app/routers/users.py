import logging

from fastapi import APIRouter, Request
from fastapi_users import FastAPIUsers

from ..db.users import UserDB, User, UserCreate, UserUpdate, \
    user_collections
from ..dependencies import jwt_authentication, add_entity_user_solutions
from ..config import settings

logger = logging.getLogger(__file__)


async def on_after_register(user: UserDB,
                            request: Request):
    logger.info(f"User {user.id} has registered. ")
    logger.info(f"Request {repr(request)} has got.")
    await add_entity_user_solutions(user.id)


async def on_after_forgot_password(user: UserDB, token: str,
                                   request: Request):
    logger.info(f"User {user.id} has forgot their password. "
                f"Reset token: {token}")
    logger.info(f"Request {repr(request)} has got.")


async def after_verification_request(user: UserDB, token: str,
                                     request: Request):
    logger.info(f"Verification requested for user {user.id}. "
                f"Verification token: {token}")
    logger.info(f"Request {repr(request)} has got.")


router = APIRouter()

fastapi_users = FastAPIUsers(
    user_collections,
    [jwt_authentication],
    User,
    UserCreate,
    UserUpdate,
    UserDB,
)
router.include_router(
    fastapi_users.get_auth_router(jwt_authentication), prefix="/auth/jwt",
    tags=["auth"]
)
router.include_router(
    fastapi_users.get_register_router(on_after_register), prefix="/auth",
    tags=["auth"]
)
router.include_router(
    fastapi_users.get_reset_password_router(
        settings.SECRET, after_forgot_password=on_after_forgot_password
    ),
    prefix="/auth",
    tags=["auth"],
)
router.include_router(
    fastapi_users.get_verify_router(
        settings.SECRET, after_verification_request=after_verification_request
    ),
    prefix="/auth",
    tags=["auth"],
)
router.include_router(fastapi_users.get_users_router(), prefix="/users",
                      tags=["users"])
