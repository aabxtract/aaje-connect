# AAJE Connect Mock Backend

This is a minimal FastAPI mock backend for the AAJE Connect sandbox flow.

Frontend endpoints:

- `POST /mono/mock-session` - create or return a session for a reference
- `GET /mono/mock-session/{reference}` - fetch session state
- `POST /mono/mock-complete` - mark a session as connected and store a mock account id

WhatsApp bot helper endpoints:

- `POST /whatsapp/bank-link/start` - create a session for a WhatsApp user and return the `/connect?reference=...` URL
- `POST /whatsapp/bank-link/done` - check the latest session for a WhatsApp user after they return and send `done`

## Quick Start

Create a Python virtualenv and install requirements:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Run the app:

```bash
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

Set `NEXT_PUBLIC_API_BASE_URL` in your frontend to:

```text
http://localhost:8000
```

## How To Get Your FastAPI URL

Local development:

```text
http://localhost:8000
```

Local API docs:

```text
http://localhost:8000/docs
```

Production:

Deploy this `backend` FastAPI app to a public host such as Render, Railway, Fly.io, or your own API server. The public service URL they give you is your FastAPI URL, for example:

```text
https://aaje-connect-api.onrender.com
```

Use that production URL as:

```env
NEXT_PUBLIC_API_BASE_URL=https://aaje-connect-api.onrender.com
```

## WhatsApp Bot Flow

When the user reaches the bank-link step in WhatsApp, call:

```http
POST /whatsapp/bank-link/start
Content-Type: application/json

{
  "whatsapp_no": "2349123456789"
}
```

The response includes a `connect_url`. Send that URL to the user as your WhatsApp CTA.

When the user returns to WhatsApp and sends `done`, call:

```http
POST /whatsapp/bank-link/done
Content-Type: application/json

{
  "whatsapp_no": "2349123456789",
  "message": "done"
}
```

If the response has `success: true`, continue onboarding and save the returned `mock_account_id` against that WhatsApp user in your main app database.

## Environment

Backend:

```env
DATABASE_URL=sqlite:///./connect_sessions.db
FRONTEND_ORIGIN=http://localhost:3000
CONNECT_APP_BASE_URL=http://localhost:3000
```

Frontend:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_WHATSAPP_BOT_NUMBER=2349123456789
```

Notes:

- The default DB is a local SQLite file: `connect_sessions.db`.
- To use Postgres/Supabase, set `DATABASE_URL` to a Postgres connection string and run `create_table.sql`, or let SQLAlchemy create tables automatically.
- No credentials are stored by design.
- Set `CONNECT_APP_BASE_URL` to the public Vercel URL of the AAJE Connect frontend so bot helper responses contain production links.
