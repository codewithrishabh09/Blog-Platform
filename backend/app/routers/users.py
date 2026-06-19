from fastapi import APIRouter
from app.database import posts_col, users_col

router = APIRouter()

@router.get("/popular")
async def get_popular_authors(limit: int = 4):
    pipeline = [
        {"$match": {"status": "published"}},
        {"$group": {"_id": "$author_id", "post_count": {"$sum": 1}}},
        {"$sort": {"post_count": -1}},
        {"$limit": limit},
    ]
    results = await posts_col.aggregate(pipeline).to_list(length=limit)

    authors = []
    for r in results:
        from bson import ObjectId
        try:
            user = await users_col.find_one({"_id": ObjectId(r["_id"])})
        except Exception:
            continue
        if user:
            authors.append({
                "username": user["username"],
                "posts": r["post_count"],
            })

    return authors