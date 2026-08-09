from fastapi import APIRouter, HTTPException, Depends, Request
from app.database import users_col
from app.models.user import UserCreate, UserLogin
from app.utils.auth import hash_password, verify_password, create_token, get_current_user
from slowapi import Limiter
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
import datetime

router = APIRouter()
limiter = Limiter(key_func=get_remote_address)

#  Track failed login attempts for rate limiting
failed_login_attempts = {}

@router.post("/register", status_code=201)
@limiter.limit("3/minute")
async def register(request: Request, data: UserCreate):
    """
    Register a new user
    Rate limit: 3 registration requests per minute per IP address
    """
    #  Validate email format
    if not data.email or "@" not in data.email:
        raise HTTPException(400, "Invalid email format")
    
    #  Check if email already exists
    if await users_col.find_one({"email": data.email}):
        raise HTTPException(400, "Email already registered")
    
    #  Check if username already exists
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
    return {"access_token": token, 
            "token_type": "bearer",
            "user": {
                "id": str(result.inserted_id),
                "email": data.email,
                "username": data.username
            }
        }

@router.post("/login")
@limiter.limit("5/minute")
async def login(request: Request, data: UserLogin):
    """
    Login user
    Rate limit: 5 login attempts per minute per IP
    Token bucket allows burst (5 quick attempts) then backoff
    """
    client_ip = request.client.host

    #  Get user from database
    user = await users_col.find_one({"email": data.email})

    #  Check if user exists and password is correct
    if not user or not verify_password(data.password, user["password_hash"]):
        #  Track failed attempts
        failed_login_attempts[client_ip] = failed_login_attempts.get(client_ip, 0) + 1
        raise HTTPException(401, "Invalid email or password.")
    
    #  Reset failed attempts
    failed_login_attempts[client_ip] = 0

    # Create JWT Token
    token = create_token({"sub": str(user["_id"])})
    return {"access_token": token, 
            "token_type": "bearer",
            "user": {
                "id": str(user["_id"]),
                "email": user["email"],
                "username": user["username"]
            }
        }

@router.get("/me")
@limiter.limit("30/minute")
async def get_me(request: Request, current_user: dict = Depends(get_current_user)):
    """
    Get current user info
    Rate limit: 30 requests per minute per IP
    """
    return {
        "id": str(current_user["_id"]),
        "email": current_user["email"],
        "username": current_user["username"],
        "bio": current_user.get("bio", ""),
        "avatar": current_user.get("avatar", ""),
        "role": current_user.get("role", "author")
    }

@router.post("/logout")
@limiter.limit("10/minute")  # Token bucket: 10 logouts per minute
async def logout(request: Request,current_user: dict = Depends(get_current_user)):
    """
    Logout user (frontend should also clear token)
    Rate limit: 10 logouts per minute per IP
    """
    return {"message": "Logged out successfully"}

@router.post("/refresh-token")
@limiter.limit("10/minute")  # Token bucket: 10 refreshes per minute
async def refresh_token(request: Request,current_user: dict = Depends(get_current_user)):
    """
    Refresh JWT token
    Rate limit: 10 refreshes per minute per IP
    """
    new_token = create_token({"sub": str(current_user["_id"])})
    return {
        "access_token": new_token,
        "token_type": "bearer"
    }