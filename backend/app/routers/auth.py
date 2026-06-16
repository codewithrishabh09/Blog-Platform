from fastapi import APIRouter, HTTPException, Depends, Request
from app.database import users_col
from app.models.user import UserCreate, UserLogin
from app.utils.auth import hash_password, verify_password, create_token, get_current_user
from slowapi import Limiter
from slowapi.util import get_remote_address
import datetime

router = APIRouter()
limiter = Limiter(key_func=get_remote_address)

@router.post("/register", status_code=201)
@limiter.limit("3/minute")
async def register(request: Request, data: UserCreate):
    if await users_col.find_one({"email": data.email}):
        raise HTTPException(400, "Email already registered")
    if await users_col.find_one({"username": data.username}):
        raise HTTPException(400, "Username taken")

    now = datetime.datetime.now(datetime.timezone.utc)
    user = {
        "email": data.email,
        "username": data.username,
        "password_hash": hash_password(data.password),
        "bio": "",
        "avatar": "",
        "role": "author",
        "created_at": now,
        "updated_at": now,
    }
    result = await users_col.insert_one(user)
    token = create_token({"sub": str(result.inserted_id)})
    return {"access_token": token, "token_type": "bearer"}

@router.post("/login")
@limiter.limit("5/minute")
async def login(request: Request, data: UserLogin):
    user = await users_col.find_one({"email": data.email})
    if not user or not verify_password(data.password, user["password_hash"]):
        raise HTTPException(401, "Invalid credentials")

    token = create_token({"sub": str(user["_id"])})
    return {"access_token": token, "token_type": "bearer"}

@router.get("/me")
async def get_me(current_user: dict = Depends(get_current_user)):
    return {
        "id": str(current_user["_id"]),
        "email": current_user["email"],
        "username": current_user["username"],
        "bio": current_user.get("bio", ""),
        "avatar": current_user.get("avatar", ""),
        "role": current_user.get("role", "author")
    }