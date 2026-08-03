import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  authCard: {
    backgroundColor: '#18181b',
    borderRadius: 12,
    padding: 24,
  },
  authIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#242428',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  authIconText: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '800',
  },
  authTitle: {
    color: '#ededed',
    fontSize: 21,
    fontWeight: '700',
    marginBottom: 8,
  },
  authSubtitle: {
    color: '#777777',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 18,
  },
  primaryButton: {
    backgroundColor: '#ededed',
    paddingVertical: 12,
    borderRadius: 9,
    alignItems: 'center',
    marginBottom: 10,
  },
  primaryButtonText: {
    color: '#111111',
    fontWeight: '700',
    fontSize: 15,
  },
  disabledButton: { opacity: 0.55 },
  signupGuide: { color: '#777777', fontSize: 12, marginBottom: 8 },
  nicknameInput: {
    color: '#dedede', backgroundColor: '#222226', borderRadius: 8,
    paddingHorizontal: 14, paddingVertical: 11, marginBottom: 10,
  },
  errorText: { color: '#fca5a5', fontSize: 13, lineHeight: 18, marginBottom: 10 },
  signupButton: { backgroundColor: '#ededed', borderRadius: 9, paddingVertical: 12, alignItems: 'center', marginBottom: 10 },
  signupButtonText: { color: '#111111', fontWeight: '700', fontSize: 14 },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#303036',
    borderRadius: 9,
    paddingVertical: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#999999',
    fontWeight: '600',
    fontSize: 15,
  },
});
