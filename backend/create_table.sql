-- Example Postgres table for connect_sessions
CREATE TABLE IF NOT EXISTS connect_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference TEXT UNIQUE NOT NULL,
  whatsapp_no TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  selected_bank TEXT,
  login_method TEXT,
  mock_account_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE
);
