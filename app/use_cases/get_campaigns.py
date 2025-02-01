from fastapi import Depends
from app.repository import get_campaign_repository
from app.schemas.campaign import CampaignOutput
from app.use_cases.base import UseCase

class GetCampaignUseCase(UseCase):
    async def execute(self, keyword: str = None, is_running: bool = None) -> list[CampaignOutput]:
        return await self.campaign_repository.get_campaigns(keyword, is_running)

def depends_get_campaign_use_case(campaign_repository = Depends(get_campaign_repository)):
    return GetCampaignUseCase(campaign_repository)