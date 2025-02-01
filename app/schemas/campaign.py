from pydantic import BaseModel, Field
from app.schemas.payout import PayoutCreate

class CampaignCreate(BaseModel):
    title: str
    url: str
    status: bool = False
    payouts: list[PayoutCreate] = Field(..., min_items=1)

class CampaignOutput(BaseModel):
    id: int
    title: str
    url: str
    status: bool
    payouts: list[PayoutCreate]