import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { AuthSession } from './api';

const SESSION_KEY = 'novforge.auth.session';
type StoredSession = { session: AuthSession; expiresAt: number };

export const saveSession = async (session: AuthSession) => {
  const value = JSON.stringify({ session, expiresAt: Date.now() + session.expiresIn * 1000 } satisfies StoredSession);
  if (Platform.OS === 'web') window.localStorage.setItem(SESSION_KEY, value);
  else await SecureStore.setItemAsync(SESSION_KEY, value);
};

export const loadSession = async (): Promise<AuthSession | null> => {
  const value = Platform.OS === 'web' ? window.localStorage.getItem(SESSION_KEY) : await SecureStore.getItemAsync(SESSION_KEY);
  if (!value) return null;
  try {
    const stored = JSON.parse(value) as StoredSession;
    if (!stored.session?.accessToken || stored.expiresAt <= Date.now()) {
      await clearSession();
      return null;
    }
    return stored.session;
  } catch {
    await clearSession();
    return null;
  }
};

export const clearSession = async () => {
  if (Platform.OS === 'web') window.localStorage.removeItem(SESSION_KEY);
  else await SecureStore.deleteItemAsync(SESSION_KEY);
};

export const updateStoredSession = async (session: AuthSession) => {
  const current = Platform.OS === 'web' ? window.localStorage.getItem(SESSION_KEY) : await SecureStore.getItemAsync(SESSION_KEY);
  let expiresAt = Date.now() + session.expiresIn * 1000;
  if (current) {
    try { expiresAt = (JSON.parse(current) as StoredSession).expiresAt || expiresAt; } catch {}
  }
  const value = JSON.stringify({ session, expiresAt } satisfies StoredSession);
  if (Platform.OS === 'web') window.localStorage.setItem(SESSION_KEY, value);
  else await SecureStore.setItemAsync(SESSION_KEY, value);
};
