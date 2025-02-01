from pydantic import BaseModel
from decimal import Decimal

class PayoutCreate(BaseModel):
    country: str
    amount: Decimal