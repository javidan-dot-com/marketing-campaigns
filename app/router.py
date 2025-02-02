from fastapi import APIRouter, Depends, status
from app.schemas.campaign import CampaignCreate, CampaignOutput
from app.use_cases.create_campaign import CreateCampaignUseCase, depends_create_campaign_use_case
from app.use_cases.get_campaigns import GetCampaignUseCase, depends_get_campaign_use_case
from app.use_cases.update_campaign import UpdateCampaignUseCase, depends_update_campaign_use_case

campaign_router = APIRouter()

@campaign_router.get("", response_model=list[CampaignOutput], status_code=status.HTTP_200_OK)
async def get_campaigns(keyword: str = None, is_running: bool = None, use_case: GetCampaignUseCase = Depends(depends_get_campaign_use_case)):
    return await use_case.execute(keyword, is_running)

@campaign_router.post("", response_model=CampaignCreate, status_code=status.HTTP_201_CREATED)
async def create_campaign(campaign_data: CampaignCreate, use_case: CreateCampaignUseCase = Depends(depends_create_campaign_use_case)):
    return await use_case.execute(campaign_data)

@campaign_router.put("/{campaign_id}", status_code=status.HTTP_200_OK)
async def update_campaign(campaign_id: int, status: bool, use_case: UpdateCampaignUseCase = Depends(depends_update_campaign_use_case)):
    return await use_case.execute(campaign_id, status)