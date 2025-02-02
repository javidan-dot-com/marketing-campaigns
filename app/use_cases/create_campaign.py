from fastapi import Depends
from app.repository import get_campaign_repository
from app.schemas.campaign import CampaignCreate
from app.use_cases.base import UseCase

class CreateCampaignUseCase(UseCase):
    async def execute(self, data: CampaignCreate):
        campaign = await self.campaign_repository.create_campaign(data)

        return campaign
    
def depends_create_campaign_use_case(campaign_repository = Depends(get_campaign_repository)):
    return CreateCampaignUseCase(campaign_repository)