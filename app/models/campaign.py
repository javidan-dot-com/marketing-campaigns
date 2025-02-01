from sqlalchemy import Boolean, Column, Integer, String
from sqlalchemy.orm import relationship
from app.models.base import Base

class Campaign(Base):
    __tablename__ = "campaigns"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    url = Column(String)
    status = Column(Boolean, default=False)

    payouts = relationship("Payout", back_populates="campaign")