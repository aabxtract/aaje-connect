import os
import uuid
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import datetime

from . import models, schemas
from .database import SessionLocal, init_db

app = FastAPI(title="AAJE Connect Mock API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv('FRONTEND_ORIGIN', '*')],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def session_response(session: models.ConnectSession):
    return schemas.SessionResponse(
        reference=session.reference,
        whatsapp_no=session.whatsapp_no,
        status=session.status,
        selected_bank=session.selected_bank,
        login_method=session.login_method,
        mock_account_id=session.mock_account_id,
        created_at=session.created_at,
        expires_at=session.expires_at,
        completed_at=session.completed_at,
    )


def build_connect_url(reference: str) -> str:
    base_url = os.getenv('CONNECT_APP_BASE_URL', 'http://localhost:3000').rstrip('/')
    return f'{base_url}/connect?reference={reference}'


def expire_if_needed(session: models.ConnectSession, db: Session):
    if session.expires_at and session.expires_at < datetime.utcnow() and session.status != 'connected':
        session.status = 'expired'
        db.add(session)
        db.commit()
        db.refresh(session)
    return session


@app.on_event('startup')
def on_startup():
    init_db()


@app.post('/mono/mock-session', response_model=schemas.SessionResponse)
def create_mock_session(req: schemas.CreateSessionRequest, db: Session = Depends(get_db)):
    # Check if session exists
    existing = db.query(models.ConnectSession).filter(models.ConnectSession.reference == req.reference).first()
    if existing:
        return session_response(existing)

    session = models.ConnectSession(
        reference=req.reference,
        whatsapp_no=req.whatsapp_no,
        status='pending'
    )
    session.touch_expiry(minutes=30)
    db.add(session)
    db.commit()
    db.refresh(session)

    return session_response(session)


@app.get('/mono/mock-session/{reference}', response_model=schemas.SessionResponse)
def get_mock_session(reference: str, db: Session = Depends(get_db)):
    session = db.query(models.ConnectSession).filter(models.ConnectSession.reference == reference).first()
    if not session:
        raise HTTPException(status_code=404, detail='Session not found')

    session = expire_if_needed(session, db)

    return session_response(session)


@app.post('/mono/mock-complete', response_model=schemas.GenericResponse)
def complete_mock_session(req: schemas.CompleteSessionRequest, db: Session = Depends(get_db)):
    session = db.query(models.ConnectSession).filter(models.ConnectSession.reference == req.reference).first()
    if not session:
        raise HTTPException(status_code=404, detail='Session not found')

    session = expire_if_needed(session, db)
    if session.status == 'expired':
        raise HTTPException(status_code=410, detail='Session has expired')

    # Mark connected and store mock account id
    session.status = 'connected' if req.status == 'connected' else 'failed'
    session.selected_bank = req.bank
    session.login_method = req.login_method
    session.mock_account_id = req.account_id
    session.completed_at = datetime.utcnow()

    # Clear any sensitive or transient fields (we never store credentials here)
    db.add(session)
    db.commit()

    return schemas.GenericResponse(success=True, message='Session completed', session_id=session.reference, account_id=session.mock_account_id)


@app.post('/whatsapp/bank-link/start', response_model=schemas.StartBankLinkResponse)
def start_whatsapp_bank_link(req: schemas.StartBankLinkRequest, db: Session = Depends(get_db)):
    reference = f'aaje_{uuid.uuid4().hex}'
    session = models.ConnectSession(
        reference=reference,
        whatsapp_no=req.whatsapp_no,
        status='pending',
    )
    session.touch_expiry(minutes=30)

    db.add(session)
    db.commit()
    db.refresh(session)

    return schemas.StartBankLinkResponse(
        success=True,
        message='Bank link session created',
        reference=session.reference,
        connect_url=build_connect_url(session.reference),
        status=session.status,
        expires_at=session.expires_at,
    )


@app.post('/whatsapp/bank-link/done', response_model=schemas.WhatsAppDoneResponse)
def complete_whatsapp_bank_link(req: schemas.WhatsAppDoneRequest, db: Session = Depends(get_db)):
    if req.message and req.message.strip().lower() != 'done':
        raise HTTPException(status_code=400, detail='Expected message to be "done"')

    session = (
        db.query(models.ConnectSession)
        .filter(models.ConnectSession.whatsapp_no == req.whatsapp_no)
        .order_by(models.ConnectSession.created_at.desc())
        .first()
    )
    if not session:
        return schemas.WhatsAppDoneResponse(
            success=False,
            message='No bank connection session found. Please start bank linking again.',
        )

    session = expire_if_needed(session, db)

    if session.status == 'connected':
        return schemas.WhatsAppDoneResponse(
            success=True,
            message='Bank connection confirmed. Continue onboarding.',
            status=session.status,
            reference=session.reference,
            selected_bank=session.selected_bank,
            mock_account_id=session.mock_account_id,
        )

    return schemas.WhatsAppDoneResponse(
        success=False,
        message='Bank connection is not complete yet.',
        status=session.status,
        reference=session.reference,
        connect_url=build_connect_url(session.reference) if session.status != 'expired' else None,
    )
