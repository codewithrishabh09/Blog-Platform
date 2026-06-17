from pydantic import BaseModel, Field, field_validator
from typing import Optional, List

class PostCreate(BaseModel):
    title: str
    body: str
    excerpt: Optional[str] = ""
    cover_image: Optional[str] = ""
    tags: Optional[List[str]] = []
    read_time: Optional[int] = Field(1, ge=1)

    @field_validator("title")
    @classmethod
    def title_not_empty(cls, v):
        if not v.strip():
            raise ValueError("Title cannot be empty")
        if len(v) > 200:
            raise ValueError("Title too long (max 200 chars)")
        return v.strip()

    @field_validator("body")
    @classmethod
    def body_not_empty(cls, v):
        if not v.strip():
            raise ValueError("Body cannot be empty")
        return v.strip()

    @field_validator("tags")
    @classmethod
    def max_tags(cls, v):
        if v and len(v) > 10:
            raise ValueError("Max 10 tags allowed")
        return v

class PostUpdate(BaseModel):
    title: Optional[str] = None
    body: Optional[str] = None
    excerpt: Optional[str] = None
    cover_image: Optional[str] = None
    tags: Optional[List[str]] = None
    read_time: Optional[int] = Field(None, ge=1)