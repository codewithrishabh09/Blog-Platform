from fastapi import APIRouter, HTTPException, Depends
from app.database import followers_col, users_col, notifications_col
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

@router.post("/{user_id}", status_code=200)
async def follow_user(user_id: str, user=Depends(get_current_user)):
    follower_id = str(user["_id"])
    if follower_id == user_id:
        raise HTTPException(400, "Cannot follow yourself")

    existing = await followers_col.find_one({
        "follower": follower_id,
        "following": user_id
    })

    if existing:
        # unfollow
        await followers_col.delete_one({"_id": existing["_id"]})
        return {"following": False}
    else:
        # follow
        await followers_col.insert_one({
            "follower": follower_id,
            "following": user_id,
            "created_at": datetime.datetime.now(datetime.timezone.utc)
        })

        # notify
        try:
            recipient = await users_col.find_one({"_id": to_oid(user_id)})
        except Exception:
            recipient = None

        if recipient:
            await notifications_col.insert_one({
                "recipient_id": user_id,
                "sender_id": follower_id,
                "sender_username": user["username"],
                "type": "follow",
                "read": False,
                "created_at": datetime.datetime.now(datetime.timezone.utc),
            })

        return {"following": True}

@router.get("/followers/{user_id}")
async def get_followers(user_id: str):
    cursor = followers_col.find({"following": user_id}).sort("created_at", -1)
    followers = await cursor.to_list(length=100)

    user_ids = [to_oid(f["follower"]) for f in followers]
    users = await users_col.find(
        {"_id": {"$in": user_ids}}
    ).to_list(length=100)

    for u in users:
        fix_id(u)

    return users

@router.get("/following/{user_id}")
async def get_following(user_id: str):
    cursor = followers_col.find({"follower": user_id}).sort("created_at", -1)
    following = await cursor.to_list(length=100)

    user_ids = [to_oid(f["following"]) for f in following]
    users = await users_col.find(
        {"_id": {"$in": user_ids}}
    ).to_list(length=100)

    for u in users:
        fix_id(u)

    return users

@router.get("/check/{user_id}", dependencies=[Depends(get_current_user)])
async def check_follow_status(user_id: str, user=Depends(get_current_user)):
    follower_id = str(user["_id"])

    is_follower = await followers_col.find_one({
        "follower": follower_id,
        "following": user_id
    })

    return {"following": bool(is_follower)}
