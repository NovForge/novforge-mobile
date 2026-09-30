import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background }, content: { flex: 1, padding: 20 }, label: { color: colors.textSecondary, fontSize: 12, fontWeight: '600', marginBottom: 9 },
  input: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 7, color: colors.text, fontSize: 15, paddingHorizontal: 15, paddingVertical: 14 },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 7, marginTop: 16, padding: 16 },
  switchTitle: { color: colors.text, fontSize: 14, fontWeight: '600' }, help: { color: colors.textMuted, fontSize: 11, marginTop: 5 },
  button: { backgroundColor: colors.primary, borderRadius: 7, alignItems: 'center', padding: 15, marginTop: 24 }, disabled: { opacity: 0.55 }, buttonText: { color: colors.primaryInk, fontWeight: '800', fontSize: 14 },
});
