from motor.motor_asyncio import AsyncIOMotorClient
from app.config import settings

client = AsyncIOMotorClient(settings.MONGO_URI)
db = client[settings.DB_NAME]

users_col    = db["users"]
posts_col    = db["posts"]
comments_col = db["comments"]
likes_col    = db["likes"]
session_col  = db["sessions"]