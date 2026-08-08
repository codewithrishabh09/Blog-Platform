from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    MONGO_URI: str = "mongodb+srv://rd1538350_db_user:Xlol87IjRhZtcQmQ@cluster0.hiuvpqs.mongodb.net/?appName=Cluster0"
    DB_NAME: str = "blog_platform"
    SECRET_KEY: str = "changeme"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440

    model_config = SettingsConfigDict(env_file=".env")

settings = Settings()