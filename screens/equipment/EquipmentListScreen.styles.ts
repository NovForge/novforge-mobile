import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  screen: { flex: 1, overflow: 'hidden', backgroundColor: colors.background },
  header: { flexShrink: 0, paddingHorizontal: 20, paddingTop: 20, paddingBottom: 16, backgroundColor: colors.background },
  brand: { color: colors.primary, fontSize: 10, fontWeight: '800', letterSpacing: 1.5 },
  title: { color: colors.text, fontSize: 24, fontWeight: '700', marginTop: 4 },
  listView: { flex: 1, minHeight: 0 },
  list: { padding: 16, paddingBottom: 40 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 30 },
  stateTitle: { color: colors.text, fontSize: 17, fontWeight: '700', textAlign: 'center' },
  stateBody: { color: colors.textMuted, fontSize: 13, textAlign: 'center', marginTop: 8 },
  retryButton: { marginTop: 18, backgroundColor: colors.primary, borderRadius: 7, paddingHorizontal: 20, paddingVertical: 11 },
  retryText: { color: colors.primaryInk, fontWeight: '800' },
});
