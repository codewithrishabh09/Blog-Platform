from pydantic import BaseModel
from typing import Optional

class CommentCreate(BaseModel):
    body: str
    parent_id: Optional[str] = None  