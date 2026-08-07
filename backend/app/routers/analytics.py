from fastapi import APIRouter, Depends
from app.database import posts_col, analytics_col, comments_col, likes_col, followers_col
from app.utils.auth import get_current_user
from bson import ObjectId

router = APIRouter()

@router.get("/")
async def user_analytics(user=Depends(get_current_user)):
    user_id = str(user["_id"])

    # posts created
    posts_count = await posts_col.count_documents({"author_id": user_id})

    # total likes received
    total_likes = await likes_col.count_documents({"post_author_id": user_id})

    # total comments received
    total_comments = await comments_col.count_documents({"post_author_id": user_id})

    # followers count
    followers_count = await followers_col.count_documents({"following": user_id})

    # following count
    following_count = await followers_col.count_documents({"follower": user_id})

    # draft posts count
    drafts_count = await posts_col.count_documents({"author_id": user_id, "status": "draft"})

    # published posts count
    published_count = await posts_col.count_documents({"author_id": user_id, "status": "published"})

    # platform-wide analytics (approx)
    total_posts = await posts_col.count_documents({"status": "published"})
    total_users = await users_col.count_documents({})
    total_comments_platform = await comments_col.count_documents({})

    # top posts by likes
    cursor = posts_col.find(
        {"author_id": user_id, "status": "published"}
    ).sort("likes", -1).limit(5)
    top_posts = await cursor.to_list(length=5)
    for p in top_posts:
        p["_id"] = str(p["_id"])

    return {
        "posts_created": posts_count,
        "total_likes_received": total_likes,
        "total_comments_received": total_comments,
        "followers_count": followers_count,
        "following_count": following_count,
        "draft_posts_count": drafts_count,
        "published_posts_count": published_count,
        "platform_total_posts": total_posts,
        "platform_total_users": total_users,
        "platform_total_comments": total_comments_platform,
        "top_posts": top_posts
    }
