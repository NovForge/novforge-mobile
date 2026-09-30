import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const buildModalStyles = StyleSheet.create({
  backdrop: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.65)' },
  sheet: { maxHeight: '78%', backgroundColor: colors.surfaceRaised, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, paddingBottom: 32 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 15 },
  title: { color: colors.text, fontSize: 20, fontWeight: '800' },
  subtitle: { color: colors.textMuted, fontSize: 12, marginTop: 5, maxWidth: 260 },
  close: { color: colors.textSecondary, fontSize: 13, padding: 4 },
  sectionTitle: { color: colors.textSecondary, fontSize: 13, fontWeight: '700', marginTop: 22, marginBottom: 9 },
  loading: { paddingVertical: 30 }, list: { maxHeight: 260 },
  empty: { color: colors.textMuted, paddingVertical: 20, textAlign: 'center' },
  buildRow: { flexDirection: 'row', alignItems: 'center', padding: 14, marginBottom: 8, borderRadius: 9, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface },
  buildInfo: { flex: 1 }, buildName: { color: colors.text, fontSize: 14, fontWeight: '700' }, buildPrice: { color: colors.textMuted, fontSize: 11, marginTop: 5 },
  select: { color: colors.primary, fontSize: 12, fontWeight: '800' },
  createRow: { flexDirection: 'row', gap: 8 }, input: { flex: 1, minWidth: 0, color: colors.text, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 9, paddingHorizontal: 12 },
  createButton: { justifyContent: 'center', backgroundColor: colors.primary, borderRadius: 9, paddingHorizontal: 14, minHeight: 46 }, createText: { color: colors.primaryInk, fontSize: 12, fontWeight: '800' },
});
