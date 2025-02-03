from fastapi import Depends
from app.exception import PayoutException
from app.repository import get_campaign_repository
from app.schemas.campaign import CampaignCreate
from app.use_cases.base import UseCase
from sqlalchemy.exc import IntegrityError
class CreateCampaignUseCase(UseCase):
    async def execute(self, data: CampaignCreate):
        try:
            campaign = await self.campaign_repository.create_campaign(data)
            return campaign
        except IntegrityError as e:
            raise PayoutException("You can't assign the same country twice to the same campaign.")
    
def depends_create_campaign_use_case(campaign_repository = Depends(get_campaign_repository)):
    return CreateCampaignUseCase(campaign_repository)