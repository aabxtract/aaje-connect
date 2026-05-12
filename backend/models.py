import uuid
from datetime import datetime, timedelta
from sqlalchemy import Column, String, Text, DateTime
from sqlalchemy.sql import func
from .database import Base


class ConnectSession(Base):
    __tablename__ = 'connect_sessions'

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    reference = Column(String, unique=True, nullable=False, index=True)
    whatsapp_no = Column(String, nullable=True)
    status = Column(String, nullable=False, default='pending')
    selected_bank = Column(String, nullable=True)
    login_method = Column(String, nullable=True)
    mock_account_id = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    expires_at = Column(DateTime(timezone=True), nullable=True)
    completed_at = Column(DateTime(timezone=True), nullable=True)

    def touch_expiry(self, minutes: int = 15):
        self.expires_at = datetime.utcnow() + timedelta(minutes=minutes)
