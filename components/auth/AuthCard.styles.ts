import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  authCard: {
    backgroundColor: '#111827',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#273449',
  },
  authIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#8b5cf6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  authIconText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '800',
  },
  authTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
  },
  authSubtitle: {
    color: '#94a3b8',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 18,
  },
  primaryButton: {
    backgroundColor: '#8b5cf6',
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: 'center',
    marginBottom: 10,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  disabledButton: { opacity: 0.55 },
  signupGuide: { color: '#cbd5e1', fontSize: 13, marginBottom: 8 },
  nicknameInput: {
    color: '#fff', borderWidth: 1, borderColor: '#475569', borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 11, marginBottom: 10,
  },
  errorText: { color: '#fca5a5', fontSize: 13, lineHeight: 18, marginBottom: 10 },
  signupButton: { borderWidth: 1, borderColor: '#8b5cf6', borderRadius: 999, paddingVertical: 12, alignItems: 'center', marginBottom: 10 },
  signupButtonText: { color: '#c4b5fd', fontWeight: '700', fontSize: 15 },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#475569',
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#e2e8f0',
    fontWeight: '600',
    fontSize: 15,
  },
});
