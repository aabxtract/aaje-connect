'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ConnectSession, ConnectFlow, Bank, LoginMethod } from '@/types';

interface ConnectContextType {
  session: ConnectSession;
  setFlow: (flow: ConnectFlow) => void;
  selectBank: (bank: Bank) => void;
  selectLoginMethod: (method: LoginMethod) => void;
  setCredentials: (username: string, password: string) => void;
  setOTP: (otp: string) => void;
  setError: (error: string | undefined) => void;
  reset: () => void;
}

const ConnectContext = createContext<ConnectContextType | undefined>(undefined);

export function ConnectProvider({ children, reference }: { children: ReactNode; reference: string }) {
  const [session, setSession] = useState<ConnectSession>({
    reference,
    currentFlow: 'intro',
    selectedBank: null,
    loginMethod: null,
    credentials: {},
    otp: '',
    status: 'pending',
  });

  const setFlow = (flow: ConnectFlow) => {
    setSession(prev => ({ ...prev, currentFlow: flow }));
  };

  const selectBank = (bank: Bank) => {
    setSession(prev => ({
      ...prev,
      selectedBank: bank,
      status: 'bank_selected',
    }));
  };

  const selectLoginMethod = (method: LoginMethod) => {
    setSession(prev => ({
      ...prev,
      loginMethod: method,
      status: 'auth_started',
    }));
  };

  const setCredentials = (username: string, password: string) => {
    setSession(prev => ({
      ...prev,
      credentials: { username, password },
    }));
  };

  const setOTP = (otp: string) => {
    setSession(prev => ({
      ...prev,
      otp,
    }));
  };

  const setError = (error: string | undefined) => {
    setSession(prev => ({
      ...prev,
      error,
      status: error ? 'failed' : prev.status,
    }));
  };

  const reset = () => {
    setSession({
      reference,
      currentFlow: 'intro',
      selectedBank: null,
      loginMethod: null,
      credentials: {},
      otp: '',
      status: 'pending',
    });
  };

  return (
    <ConnectContext.Provider value={{ session, setFlow, selectBank, selectLoginMethod, setCredentials, setOTP, setError, reset }}>
      {children}
    </ConnectContext.Provider>
  );
}

export function useConnect() {
  const context = useContext(ConnectContext);
  if (!context) {
    throw new Error('useConnect must be used within ConnectProvider');
  }
  return context;
}
