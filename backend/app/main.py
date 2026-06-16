from fastapi import FastAPI
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.trustedhost import TrustedHostMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from fastapi import Request
from fastapi.responses import JSONResponse
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from app.routers import (
    auth, posts, comments, bookmarks, notifications,
    messages, analytics, followers, session, likes, users
)
from app.database import client, users_col, posts_col, likes_col, comments_col

# Rate limiter
limiter = Limiter(key_func=get_remote_address)

# Security headers middleware
class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        response = await call_next(request)
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        return response

# Request size limit middleware
class LimitRequestSizeMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        if request.headers.get("content-length"):
            if int(request.headers["content-length"]) > 1_000_000:
                return JSONResponse({"detail": "Request too large"}, status_code=413)
        return await call_next(request)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # startup
    await users_col.create_index("email",    unique=True)
    await users_col.create_index("username", unique=True)
    await posts_col.create_index("slug",     unique=True)
    await posts_col.create_index([("title", "text"), ("body", "text")])
    await posts_col.create_index([("author_id", 1), ("status", 1)])
    await comments_col.create_index("post_id")
    await likes_col.create_index([("user_id", 1), ("target_id", 1)], unique=True)
    yield
    # shutdown
    client.close()

app = FastAPI(title="Blog Platform API", lifespan=lifespan)

# Rate limiting
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Middlewares
app.add_middleware(SecurityHeadersMiddleware)
app.add_middleware(LimitRequestSizeMiddleware)
app.add_middleware(TrustedHostMiddleware, allowed_hosts=["localhost", "127.0.0.1"])
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["Content-Type", "Authorization"],
)

app.include_router(auth.router,          prefix="/auth",          tags=["Auth"])
app.include_router(posts.router,         prefix="/posts",         tags=["Posts"])
app.include_router(comments.router,      prefix="/comments",      tags=["Comments"])
app.include_router(bookmarks.router,     prefix="/bookmarks",     tags=["Bookmarks"])
app.include_router(notifications.router, prefix="/notifications", tags=["Notifications"])
app.include_router(messages.router,      prefix="/messages",      tags=["Messages"])
app.include_router(analytics.router,     prefix="/analytics",     tags=["Analytics"])
app.include_router(followers.router,     prefix="/followers",     tags=["Followers"])
app.include_router(session.router,       prefix="/session",       tags=["Session"])
app.include_router(likes.router,         prefix="/likes",         tags=["Likes"])
app.include_router(users.router,         prefix="/users",         tags=["Users"])

@app.get("/")
async def root():
    return {"message": "Blog API running"}