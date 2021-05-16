from pydantic import BaseSettings


class Settings(BaseSettings):
    MONGODB_URL: str = "mongodb://localhost:27017"
    SECRET: str = "SECRET"
    DEFAULT_DB: str = "physics-practice"

    class Config:
        case_sensitive = True

        # env_file = ".env"


settings = Settings()
