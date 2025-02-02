from fastapi import Request
from fastapi.responses import JSONResponse
import logging
from pydantic import ValidationError

def generic_exception_handler(_: Request, exc: Exception):
    logging.error(f"Unhandled exception: {exc}")
    return JSONResponse(
        status_code=500,
        content={"message": "An internal server error occurred. Please try again later."},
    )