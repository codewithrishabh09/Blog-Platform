from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth, posts, comments
from app.database import client, users_col, posts_col, likes_col, comments_col

app = FastAPI(title="Blog Platform API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router,     prefix="/auth",     tags=["Auth"])
app.include_router(posts.router,    prefix="/posts",    tags=["Posts"])
app.include_router(comments.router, prefix="/comments", tags=["Comments"])

@app.on_event("startup")
async def create_indexes():
    await users_col.create_index("email",    unique=True)
    await users_col.create_index("username", unique=True)
    await posts_col.create_index("slug",     unique=True)
    await posts_col.create_index([("title", "text"), ("body", "text")])
    await posts_col.create_index([("author_id", 1), ("status", 1)])
    await comments_col.create_index("post_id")
    await likes_col.create_index([("user_id", 1), ("target_id", 1)], unique=True)

@app.on_event("shutdown")
async def shutdown():
    client.close()

@app.get("/")
async def root():
    return {"message": "Blog API running"}