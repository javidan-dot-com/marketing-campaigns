import abc
from app.repository import CampaignRepository

class UseCase(abc.ABC):
    def __init__(self, campaign_repository: CampaignRepository):
        self.campaign_repository = campaign_repository
    
    @abc.abstractmethod
    def execute(self):
        raise NotImplementedError