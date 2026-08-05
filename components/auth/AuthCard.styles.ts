import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  authCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 24,
  },
  authIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primaryMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  authIconText: {
    color: colors.primary,
    fontSize: 28,
    fontWeight: '800',
  },
  authTitle: {
    color: colors.text,
    fontSize: 21,
    fontWeight: '700',
    marginBottom: 8,
  },
  authSubtitle: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 18,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 9,
    alignItems: 'center',
    marginBottom: 10,
  },
  primaryButtonText: {
    color: colors.primaryInk,
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
  signupButton: { backgroundColor: colors.primary, borderRadius: 7, paddingVertical: 12, alignItems: 'center', marginBottom: 10 },
  signupButtonText: { color: colors.primaryInk, fontWeight: '800', fontSize: 14 },
  secondaryButton: {
    borderWidth: 1,
    borderColor: colors.borderStrong,
    borderRadius: 7,
    paddingVertical: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: colors.textSecondary,
    fontWeight: '600',
    fontSize: 15,
  },
});
