from fastapi import APIRouter, HTTPException, Depends
from app.database import bookmarks_col, posts_col
from app.utils.auth import get_current_user
from bson import ObjectId
import datetime

router = APIRouter()

def to_oid(id: str) -> ObjectId:
    try:
        return ObjectId(id)
    except Exception:
        raise HTTPException(400, "Invalid ID")

def fix_id(doc):
    doc["_id"] = str(doc["_id"])
    return doc

@router.post("/{post_id}", status_code=200)
async def toggle_bookmark(post_id: str, user=Depends(get_current_user)):
    user_id = str(user["_id"])

    existing = await bookmarks_col.find_one({
        "user_id": user_id,
        "post_id": post_id
    })

    if existing:
        await bookmarks_col.delete_one({"_id": existing["_id"]})
        return {"bookmarked": False}
    else:
        await bookmarks_col.insert_one({
            "user_id": user_id,
            "post_id": post_id,
            "created_at": datetime.datetime.now(datetime.timezone.utc)
        })
        return {"bookmarked": True}

@router.get("/")
async def get_bookmarks(user=Depends(get_current_user)):
    user_id = str(user["_id"])

    bookmarks = await bookmarks_col.find(
        {"user_id": user_id}
    ).sort("created_at", -1).to_list(length=100)

    if not bookmarks:
        return []

    post_ids = [to_oid(b["post_id"]) for b in bookmarks]
    posts = await posts_col.find(
        {"_id": {"$in": post_ids}}
    ).to_list(length=100)

    for post in posts:
        fix_id(post)

    return posts