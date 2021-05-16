import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routers import problems, users
from .routers import user_solutions
# setup loggers
logging.config.fileConfig('logging.conf', disable_existing_loggers=False)

# get root logger
logger = logging.getLogger(__name__)

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(users.router)
app.include_router(user_solutions.router)
app.include_router(problems.router)


@app.get("/")
async def root():
    return {"message": "MainAPI"}
