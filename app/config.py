import os

APP_DEBUG: bool = os.getenv("APP_DEBUG", default=False)

DATABASE_URL: str = os.getenv(
    "DATABASE_URL", default=""
)