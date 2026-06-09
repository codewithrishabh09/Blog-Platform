from fastapi import APIRouter, HTTPException
from app.database import users_col
from app.models.user import UserCreate, UserLogin
from app.utils.auth import hash_password, verify_password, create_token
from bson import ObjectId
import datetime

router = APIRouter()

@router.post("/register")
async def register(data: UserCreate):
    if await users_col.find_one({"email": data.email}):
        raise HTTPException(400, "Email already registered")
    if await users_col.find_one({"username": data.username}):
        raise HTTPException(400, "Username taken")

    user = {
        "email": data.email,
        "username": data.username,
        "password_hash": hash_password(data.password),
        "bio": "",
        "avatar": "",
        "role": "author",
        "created_at": datetime.datetime.utcnow(),
    }
    result = await users_col.insert_one(user)
    token = create_token({"sub": str(result.inserted_id)})
    return {"access_token": token, "token_type": "bearer"}

@router.post("/login")
async def login(data: UserLogin):
    user = await users_col.find_one({"email": data.email})
    if not user or not verify_password(data.password, user["password_hash"]):
        raise HTTPException(401, "Invalid credentials")

    token = create_token({"sub": str(user["_id"])})
    return {"access_token": token, "token_type": "bearer"}

@router.get("/me")
async def me(current_user=None):
    from app.utils.auth import get_current_user
    from fastapi import Depends
    # use /me with Depends in main or call directly
    return {"message": "use Depends(get_current_user) on this route"}