from fastapi import APIRouter, Depends, status
from app.schemas.campaign import CampaignOutput
from app.use_cases.get_campaigns import GetCampaignUseCase, depends_get_campaign_use_case

campaign_router = APIRouter()

@campaign_router.get("", response_model=list[CampaignOutput], status_code=status.HTTP_200_OK)
async def get_campaigns(keyword: str = None, is_running: bool = None, use_case: GetCampaignUseCase = Depends(depends_get_campaign_use_case)):
    return await use_case.execute(keyword, is_running)