import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  center: { flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center', padding: 30 },
  error: { color: '#fca5a5', textAlign: 'center', fontSize: 16 },
  image: { width: '100%', height: 270, backgroundColor: colors.surface },
  imageFallback: { height: 220, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' },
  imageFallbackText: { color: colors.textSubtle, fontSize: 34, fontWeight: '700' },
  body: { padding: 22, paddingBottom: 50 },
  manufacturer: { color: colors.textSubtle, fontSize: 10, fontWeight: '600', textTransform: 'uppercase' },
  name: { color: colors.text, fontSize: 24, fontWeight: '700', lineHeight: 31, marginTop: 7 },
  price: { color: colors.primary, fontSize: 20, fontWeight: '700', marginTop: 12 },
  description: { color: colors.textMuted, fontSize: 13, lineHeight: 21, marginTop: 20 },
  specTitle: { color: colors.textSecondary, fontSize: 15, fontWeight: '700', marginTop: 26, marginBottom: 10 },
  specRow: { flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: colors.border, paddingVertical: 11, gap: 20 },
  specLabel: { color: colors.textSubtle, fontSize: 12, flex: 1 },
  specValue: { color: colors.textSecondary, fontSize: 12, fontWeight: '600', flex: 1, textAlign: 'right' },
});
