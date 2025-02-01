from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app import config
from app.router import campaign_router

app = FastAPI(
    title="Marketing Campaigns API",
    docs_url="/docs",
    openapi_url="/public/v1/openapi.json",
    debug=config.APP_DEBUG,
)

app.add_middleware(CORSMiddleware, **{
    "allow_origins": ["*"],
    "allow_credentials": True,
    "allow_methods": ["*"],
    "allow_headers": ["*"],
})

app.include_router(campaign_router, tags=["campaigns"], prefix="/campaigns")