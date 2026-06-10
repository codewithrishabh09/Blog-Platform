from pydantic import BaseModel, field_validator
from typing import Optional

class CommentCreate(BaseModel):
    body: str
    parent_id: Optional[str] = None

    @field_validator("body")
    @classmethod
    def body_not_empty(cls, v):
        if not v.strip():
            raise ValueError("Comment cannot be empty")
        if len(v) > 1000:
            raise ValueError("Comment too long (max 1000 chars)")
        return v.strip()