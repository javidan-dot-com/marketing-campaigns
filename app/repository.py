from fastapi import Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.database.session import get_db
from app.models.campaign import Campaign
from app.models.payout import Payout
from app.schemas.campaign import CampaignCreate
from app.schemas.payout import PayoutCreate

class CampaignRepository:
    def __init__(self, session = Depends(get_db)):
        self.session = session
    
    async def create_campaign(self, campaign_data: CampaignCreate):
        campaign = Campaign(
            title=campaign_data.title,
            url=campaign_data.url,
            payouts=[
                Payout(
                    amount=payout.amount,
                    country=payout.country
                ) for payout in campaign_data.payouts
            ]
        )
        self.session.add(campaign)
        await self.session.commit()
        await self.session.refresh(campaign)
        return campaign
    
    async def get_campaigns(self, keyword: str = None, is_running: bool = None):
        query = select(Campaign).order_by(Campaign.id.desc()).options(selectinload(Campaign.payouts))

        if keyword:
            query = query.filter(Campaign.title.ilike(f"%{keyword}%")).filter(Campaign.url.ilike(f"%{keyword}%"))
        
        if is_running is not None:
            query = query.filter(Campaign.status == is_running)
        
        result = await self.session.execute(query)
        return result.scalars().all()

    async def update_campaign(self, campaign_id: int, status: bool):
        query = select(Campaign).filter(Campaign.id == campaign_id)
        result = await self.session.execute(query)
        campaign = result.scalars().first()
        campaign.status = status
        await self.session.commit()
        await self.session.refresh(campaign)
        return campaign

def get_campaign_repository(session: AsyncSession = Depends(get_db)):
    return CampaignRepository(session)