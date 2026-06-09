from pydantic import BaseModel
from typing import Optional, List

class PostCreate(BaseModel):
    title: str
    body: str
    cover_image: Optional[str] = ""
    tags: Optional[List[str]] = []
    read_time: Optional[int] = 1

class PostUpdate(BaseModel):
    title: Optional[str] = None
    body: Optional[str] = None
    cover_image: Optional[str] = None
    tags: Optional[List[str]] = None
    read_time: Optional[int] = None