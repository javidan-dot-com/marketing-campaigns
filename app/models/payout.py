from sqlalchemy import Column, ForeignKey, Integer, String, DECIMAL, UniqueConstraint
from sqlalchemy.orm import relationship
from app.models.base import Base

class Payout(Base):
    __tablename__ = "payouts"

    id = Column(Integer, primary_key=True, index=True)
    campaign_id = Column(Integer, ForeignKey("campaigns.id"))
    country = Column(String)
    amount = Column(DECIMAL(10, 3))

    campaign = relationship("Campaign", back_populates="payouts")

    __table_args__ = (
        UniqueConstraint('campaign_id', 'country', name='uq_campaign_country'),
    )