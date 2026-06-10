from fastapi import FastAPI
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
from app.routers import (
    auth, posts, comments, bookmarks, notifications,
    messages, analytics, followers, session, likes, users
)
from app.database import client, users_col, posts_col, likes_col, comments_col


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

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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