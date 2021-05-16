import motor.motor_asyncio
from ..config import settings


client = motor.motor_asyncio.AsyncIOMotorClient(
    settings.MONGODB_URL, uuidRepresentation="standard"
)
client_db = client[settings.DEFAULT_DB]
