from sqlalchemy import Column, ForeignKey, Integer, String, DECIMAL
from sqlalchemy.orm import relationship
from app.models.base import Base

class Payout(Base):
    __tablename__ = "payouts"

    id = Column(Integer, primary_key=True, index=True)
    campaign_id = Column(Integer, ForeignKey("campaigns.id"))
    country = Column(String)
    amount = Column(DECIMAL(10, 3))

    campaign = relationship("Campaign", back_populates="payouts")