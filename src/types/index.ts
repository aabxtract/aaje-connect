// Flow steps
export type FlowStep = 'intro' | 'bank-selection' | 'login-method' | 'credentials' | 'otp' | 'processing' | 'success' | 'error';

// Alias for historical names used in some files
export type ConnectFlow = FlowStep;

// Login method internal types (use hyphenated internal values in UI logic)
export type LoginMethod = 'internet-banking' | 'mobile-banking';

// Bank interface
export interface Bank {
  id: string;
  name: string;
  code: string;
  searchable: string[];
}

// Connect session interface
export interface ConnectSession {
  reference: string;
  currentFlow: FlowStep;
  selectedBank: Bank | null;
  loginMethod: LoginMethod | null;
  credentials: {
    username?: string;
    password?: string;
  };
  otp: string;
  accountId?: string;
  status?: 'pending' | 'bank_selected' | 'auth_started' | 'connected' | 'failed' | 'expired';
  error?: string;
}

// API request/response types
export interface CreateSessionRequest {
  reference: string;
  whatsapp_no?: string;
}

export interface CompleteSessionRequest {
  reference: string;
  bank: string;
  login_method: string;
  account_id: string;
  status: 'connected' | 'failed';
  error_message?: string;
}

export interface CompleteSessionResponse {
  success: boolean;
  message: string;
  session_id?: string;
  account_id?: string;
}

export interface MockCompletePayload {
  reference: string;
  bank: string;
  login_method: string;
  account_id: string;
  status: 'connected';
}
