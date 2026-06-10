from fastapi import APIRouter, HTTPException, Depends
from app.database import comments_col
from app.models.comments import CommentCreate
from app.utils.auth import get_current_user
from bson import ObjectId
import datetime

router = APIRouter()

def fix_id(doc):
    doc["_id"] = str(doc["_id"])
    return doc

@router.get("/{post_id}")
async def get_comments(post_id: str):
    cursor = comments_col.find({"post_id": post_id}).sort("created_at", 1)
    comments = await cursor.to_list(length=200)
    return [fix_id(c) for c in comments]

@router.post("/{post_id}", status_code=201)
async def add_comment(post_id: str, data: CommentCreate, user=Depends(get_current_user)):
    comment = {
        "post_id": post_id,
        "author_id": str(user["_id"]),
        "author_username": user["username"],
        "body": data.body,
        "parent_id": data.parent_id,
        "likes": 0,
        "created_at": datetime.datetime.now(datetime.timezone.utc),
    }
    result = await comments_col.insert_one(comment)
    return {"id": str(result.inserted_id)}

@router.delete("/{comment_id}")
async def delete_comment(comment_id: str, user=Depends(get_current_user)):
    try:
        oid = ObjectId(comment_id)
    except Exception:
        raise HTTPException(400, "Invalid comment ID")

    result = await comments_col.delete_one(
        {"_id": oid, "author_id": str(user["_id"])}
    )
    if result.deleted_count == 0:
        raise HTTPException(403, "Not allowed")
    return {"message": "Deleted"}