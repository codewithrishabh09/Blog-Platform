from fastapi import APIRouter, HTTPException, Depends, Query
from app.database import posts_col, likes_col
from app.models.post import PostCreate, PostUpdate
from app.utils.auth import get_current_user
from bson import ObjectId
import datetime, re

router = APIRouter()

def slugify(title: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", title.lower()).strip("-")
    return slug + "-" + str(int(datetime.datetime.utcnow().timestamp()))

def fix_id(doc):
    doc["_id"] = str(doc["_id"])
    if "author_id" in doc:
        doc["author_id"] = str(doc["author_id"])
    return doc

@router.get("/")
async def list_posts(
    page: int = Query(1, ge=1),
    limit: int = Query(10, le=50),
    tag: str = None,
    search: str = None,
):
    query = {"status": "published"}
    if tag:
        query["tags"] = tag
    if search:
        query["$text"] = {"$search": search}

    skip = (page - 1) * limit
    cursor = posts_col.find(query).sort("published_at", -1).skip(skip).limit(limit)
    posts = await cursor.to_list(length=limit)
    return [fix_id(p) for p in posts]

@router.get("/my")
async def my_posts(user=Depends(get_current_user)):
    cursor = posts_col.find({"author_id": str(user["_id"])}).sort("created_at", -1)
    posts = await cursor.to_list(length=100)
    return [fix_id(p) for p in posts]

@router.get("/{slug}")
async def get_post(slug: str):
    post = await posts_col.find_one_and_update(
        {"slug": slug, "status": "published"},
        {"$inc": {"views": 1}},
        return_document=True,
    )
    if not post:
        raise HTTPException(404, "Post not found")
    return fix_id(post)

@router.post("/")
async def create_post(data: PostCreate, user=Depends(get_current_user)):
    post = {
        **data.dict(),
        "slug": slugify(data.title),
        "author_id": str(user["_id"]),
        "status": "draft",
        "views": 0,
        "created_at": datetime.datetime.utcnow(),
        "published_at": None,
    }
    result = await posts_col.insert_one(post)
    return {"id": str(result.inserted_id), "slug": post["slug"]}

@router.put("/{id}")
async def update_post(id: str, data: PostUpdate, user=Depends(get_current_user)):
    updates = {k: v for k, v in data.dict().items() if v is not None}
    if not updates:
        raise HTTPException(400, "Nothing to update")
    result = await posts_col.update_one(
        {"_id": ObjectId(id), "author_id": str(user["_id"])},
        {"$set": updates},
    )
    if result.matched_count == 0:
        raise HTTPException(403, "Not allowed or post not found")
    return {"message": "Updated"}

@router.delete("/{id}")
async def delete_post(id: str, user=Depends(get_current_user)):
    result = await posts_col.delete_one(
        {"_id": ObjectId(id), "author_id": str(user["_id"])}
    )
    if result.deleted_count == 0:
        raise HTTPException(403, "Not allowed or post not found")
    return {"message": "Deleted"}

@router.post("/{id}/publish")
async def publish_post(id: str, user=Depends(get_current_user)):
    result = await posts_col.update_one(
        {"_id": ObjectId(id), "author_id": str(user["_id"])},
        {"$set": {"status": "published", "published_at": datetime.datetime.utcnow()}},
    )
    if result.matched_count == 0:
        raise HTTPException(403, "Not allowed")
    return {"message": "Published"}

@router.post("/{id}/like")
async def toggle_like(id: str, user=Depends(get_current_user)):
    existing = await likes_col.find_one(
        {"user_id": str(user["_id"]), "target_id": id}
    )
    if existing:
        await likes_col.delete_one({"_id": existing["_id"]})
        await posts_col.update_one({"_id": ObjectId(id)}, {"$inc": {"likes": -1}})
        return {"liked": False}
    else:
        await likes_col.insert_one({
            "user_id": str(user["_id"]),
            "target_id": id,
            "target_type": "post",
            "created_at": datetime.datetime.utcnow(),
        })
        await posts_col.update_one({"_id": ObjectId(id)}, {"$inc": {"likes": 1}})
        return {"liked": True}