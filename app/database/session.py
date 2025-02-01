from typing import AsyncIterator
from sqlalchemy.ext.asyncio import AsyncSession
from app.config import DATABASE_URL
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncEngine

ASYNC_ENGINE: AsyncEngine = create_async_engine(DATABASE_URL, **{
        "pool_size": 10,
        "pool_pre_ping": True,
    })
make_async_session = async_sessionmaker(ASYNC_ENGINE, autocommit=False, autoflush=False)


async def get_db() -> AsyncIterator[AsyncSession]:
    async with make_async_session() as session:
        yield session