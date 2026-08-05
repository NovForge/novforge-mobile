import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 8, padding: 16, marginBottom: 10 },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  badge: { borderRadius: 5, paddingHorizontal: 7, paddingVertical: 4 },
  publicBadge: { backgroundColor: colors.primaryMuted }, privateBadge: { backgroundColor: colors.surfaceMuted },
  badgeText: { fontSize: 10, fontWeight: '700' }, publicBadgeText: { color: colors.primary }, privateBadgeText: { color: colors.textMuted },
  date: { color: colors.textSubtle, fontSize: 11 },
  title: { color: colors.text, fontSize: 17, lineHeight: 24, fontWeight: '700', marginTop: 14 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 18 },
  summaryLabel: { color: colors.textSubtle, fontSize: 11, marginBottom: 5 }, summaryValue: { color: colors.textSecondary, fontSize: 14, fontWeight: '600' },
  priceArea: { alignItems: 'flex-end' }, price: { color: colors.primary, fontSize: 18, fontWeight: '700' },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: colors.border, marginTop: 16, paddingTop: 12 },
  footerText: { color: colors.textMuted, fontSize: 12, fontWeight: '600' }, arrow: { color: colors.primary, fontSize: 20, lineHeight: 20 },
});
