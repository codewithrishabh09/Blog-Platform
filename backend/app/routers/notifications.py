from fastapi import APIRouter, Depends
from app.database import notifications_col
from app.utils.auth import get_current_user
from bson import ObjectId
import datetime

router = APIRouter()

def fix_id(doc):
    doc["_id"] = str(doc["_id"])
    return doc

@router.get("/")
async def get_notifications(user=Depends(get_current_user)):
    cursor = notifications_col.find(
        {"recipient_id": str(user["_id"])}
    ).sort("created_at", -1).limit(50)
    notifications = await cursor.to_list(length=50)
    return [fix_id(n) for n in notifications]

@router.post("/read/{notification_id}")
async def mark_read(notification_id: str, user=Depends(get_current_user)):
    await notifications_col.update_one(
        {
            "_id": ObjectId(notification_id),
            "recipient_id": str(user["_id"])
        },
        {"$set": {"read": True}}
    )
    return {"message": "Marked as read"}

@router.post("/read-all")
async def mark_all_read(user=Depends(get_current_user)):
    await notifications_col.update_many(
        {"recipient_id": str(user["_id"]), "read": False},
        {"$set": {"read": True}}
    )
    return {"message": "All marked as read"}
