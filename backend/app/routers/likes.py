from fastapi import APIRouter, HTTPException, Depends
from app.database import likes_col, posts_col, notifications_col
from app.utils.auth import get_current_user
from bson import ObjectId
import datetime

router = APIRouter()

def fix_id(doc):
    doc["_id"] = str(doc["_id"])
    return doc

@router.post("/{post_id}")
async def toggle_like(post_id: str, user=Depends(get_current_user)):
    user_id = str(user["_id"])

    existing = await likes_col.find_one({
        "post_id": post_id,
        "user_id": user_id
    })

    if existing:
        # unlike
        await likes_col.delete_one({"_id": existing["_id"]})
        return {"liked": False}
    else:
        # like
        await likes_col.insert_one({
            "post_id": post_id,
            "user_id": user_id,
            "created_at": datetime.datetime.now(datetime.timezone.utc),
        })

        # notify
        try:
            post = await posts_col.find_one({"_id": ObjectId(post_id)})
        except Exception:
            post = None

        if post and post["author_id"] != user_id:
            await notifications_col.insert_one({
                "recipient_id": post["author_id"],
                "sender_id": user_id,
                "sender_username": user["username"],
                "type": "like",
                "post_id": post_id,
                "post_title": post.get("title", ""),
                "read": False,
                "created_at": datetime.datetime.now(datetime.timezone.utc),
            })

        return {"liked": True}

@router.get("/{post_id}")
async def get_likes(post_id: str):
    cursor = likes_col.find({"post_id": post_id})
    likes = await cursor.to_list(length=200)
    return [fix_id(l) for l in likes]
