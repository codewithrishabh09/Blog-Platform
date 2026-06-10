from pydantic import BaseModel, EmailStr, field_validator, Field
from typing import Optional

class UserCreate(BaseModel):
    username: str = Field(..., min_length=3, max_length=30)
    email: EmailStr
    password: str = Field(..., min_length=6)

    @field_validator("username")
    @classmethod
    def username_valid(cls, v):
        if not v.strip():
            raise ValueError("Username cannot be empty")
        if not v.replace("_", "").replace("-", "").isalnum():
            raise ValueError("Username can only contain letters, numbers, - and _")
        return v.strip().lower()

    @field_validator("password")
    @classmethod
    def password_strength(cls, v):
        if len(v) < 6:
            raise ValueError("Password must be at least 6 characters")
        return v

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: str
    username: str
    email: str
    bio: Optional[str] = ""
    avatar: Optional[str] = ""
    role: str