import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: { backgroundColor: '#111a2b', borderWidth: 1, borderColor: '#1e293b', borderRadius: 20, padding: 18, marginBottom: 14 },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  badge: { borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5 },
  publicBadge: { backgroundColor: '#12372e' }, privateBadge: { backgroundColor: '#242d3d' },
  badgeText: { fontSize: 11, fontWeight: '800' }, publicBadgeText: { color: '#6ee7b7' }, privateBadgeText: { color: '#94a3b8' },
  date: { color: '#64748b', fontSize: 12 },
  title: { color: '#f8fafc', fontSize: 19, lineHeight: 27, fontWeight: '800', marginTop: 16 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 22 },
  summaryLabel: { color: '#64748b', fontSize: 12, marginBottom: 5 }, summaryValue: { color: '#cbd5e1', fontSize: 16, fontWeight: '700' },
  priceArea: { alignItems: 'flex-end' }, price: { color: '#c4b5fd', fontSize: 20, fontWeight: '900' },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: '#1e293b', marginTop: 18, paddingTop: 14 },
  footerText: { color: '#94a3b8', fontSize: 13, fontWeight: '700' }, arrow: { color: '#8b5cf6', fontSize: 24, lineHeight: 24 },
});
