from fastapi import Depends
from app.repository import get_campaign_repository
from app.use_cases.base import UseCase

class UpdateCampaignUseCase(UseCase):
    async def execute(self, campaign_id: int, status: bool):
        return await self.campaign_repository.update_campaign(campaign_id, status)
    
def depends_update_campaign_use_case(campaign_repository = Depends(get_campaign_repository)):
    return UpdateCampaignUseCase(campaign_repository)
        