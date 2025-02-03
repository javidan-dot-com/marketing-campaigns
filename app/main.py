from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from pydantic import ValidationError
from app import config
from app.exception import PayoutException, generic_exception_handler, payout_exception_handler
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

app.add_exception_handler(Exception, generic_exception_handler)
app.add_exception_handler(PayoutException, payout_exception_handler)

app.include_router(campaign_router, tags=["campaigns"], prefix="/campaigns")