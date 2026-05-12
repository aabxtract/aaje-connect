from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class CreateSessionRequest(BaseModel):
    reference: str
    whatsapp_no: Optional[str] = None


class SessionResponse(BaseModel):
    reference: str
    whatsapp_no: Optional[str] = None
    status: str
    selected_bank: Optional[str] = None
    login_method: Optional[str] = None
    mock_account_id: Optional[str] = None
    created_at: Optional[datetime] = None
    expires_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None


class CompleteSessionRequest(BaseModel):
    reference: str
    bank: str
    login_method: str
    account_id: str
    status: str


class GenericResponse(BaseModel):
    success: bool
    message: str
    session_id: Optional[str] = None
    account_id: Optional[str] = None


class StartBankLinkRequest(BaseModel):
    whatsapp_no: str


class StartBankLinkResponse(BaseModel):
    success: bool
    message: str
    reference: str
    connect_url: str
    status: str
    expires_at: Optional[datetime] = None


class WhatsAppDoneRequest(BaseModel):
    whatsapp_no: str
    message: Optional[str] = "done"


class WhatsAppDoneResponse(BaseModel):
    success: bool
    message: str
    status: Optional[str] = None
    reference: Optional[str] = None
    selected_bank: Optional[str] = None
    mock_account_id: Optional[str] = None
    connect_url: Optional[str] = None
