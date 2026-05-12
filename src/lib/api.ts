import { MockCompletePayload } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

export async function validateSession(reference: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/mono/mock-session/${reference}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Session not found or invalid');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error validating session:', error);
    throw error;
  }
}

export async function completeConnection(payload: MockCompletePayload) {
  try {
    const response = await fetch(`${API_BASE_URL}/mono/mock-complete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    
    if (!response.ok) {
      throw new Error('Failed to complete connection');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error completing connection:', error);
    throw error;
  }
}

export async function createSession(reference: string, whatsappNo?: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/mono/mock-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        reference,
        whatsapp_no: whatsappNo,
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create session');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating session:', error);
    throw error;
  }
}
