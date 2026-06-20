from fastapi import APIRouter, HTTPException, Depends
from app.database import messages_col, users_col
from app.utils.auth import get_current_user
from pydantic import BaseModel
from bson import ObjectId
import datetime

router = APIRouter()

class MessageCreate(BaseModel):
    body: str

def fix_id(doc):
    doc["_id"] = str(doc["_id"])
    return doc

def to_oid(id: str) -> ObjectId:
    try:
        return ObjectId(id)
    except Exception:
        raise HTTPException(400, "Invalid ID")

@router.get("/conversations")
async def get_conversations(user=Depends(get_current_user)):
    user_id = str(user["_id"])

    cursor = messages_col.find({
        "$or": [
            {"sender_id": user_id},
            {"recipient_id": user_id},
        ]
    }).sort("created_at", -1)

    messages = await cursor.to_list(length=500)

    # group by the "other" user, keep only the latest message per conversation
    conversations = {}
    for m in messages:
        other_id = m["recipient_id"] if m["sender_id"] == user_id else m["sender_id"]
        if other_id not in conversations:
            conversations[other_id] = m

    result = []
    for other_id, last_msg in conversations.items():
        try:
            other_user = await users_col.find_one({"_id": to_oid(other_id)})
        except Exception:
            continue
        if not other_user:
            continue
        result.append({
            "user_id": other_id,
            "username": other_user["username"],
            "last_message": last_msg["body"],
            "last_message_at": last_msg["created_at"],
        })

    result.sort(key=lambda x: x["last_message_at"], reverse=True)
    return result

@router.get("/{other_user_id}")
async def get_thread(other_user_id: str, user=Depends(get_current_user)):
    user_id = str(user["_id"])

    cursor = messages_col.find({
        "$or": [
            {"sender_id": user_id, "recipient_id": other_user_id},
            {"sender_id": other_user_id, "recipient_id": user_id},
        ]
    }).sort("created_at", 1)

    messages = await cursor.to_list(length=500)
    return [fix_id(m) for m in messages]

@router.post("/{other_user_id}", status_code=201)
async def send_message(other_user_id: str, data: MessageCreate, user=Depends(get_current_user)):
    if not data.body.strip():
        raise HTTPException(400, "Message cannot be empty")

    try:
        recipient = await users_col.find_one({"_id": to_oid(other_user_id)})
    except Exception:
        raise HTTPException(400, "Invalid recipient")

    if not recipient:
        raise HTTPException(404, "User not found")

    message = {
        "sender_id": str(user["_id"]),
        "sender_username": user["username"],
        "recipient_id": other_user_id,
        "body": data.body.strip(),
        "created_at": datetime.datetime.now(datetime.timezone.utc),
    }

    result = await messages_col.insert_one(message)
    message["_id"] = str(result.inserted_id)
    return message