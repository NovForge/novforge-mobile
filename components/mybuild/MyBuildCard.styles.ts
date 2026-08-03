import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: { backgroundColor: '#18181b', borderRadius: 11, padding: 16, marginBottom: 10 },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  badge: { borderRadius: 5, paddingHorizontal: 7, paddingVertical: 4 },
  publicBadge: { backgroundColor: '#303036' }, privateBadge: { backgroundColor: '#222226' },
  badgeText: { fontSize: 10, fontWeight: '600' }, publicBadgeText: { color: '#bdbdbd' }, privateBadgeText: { color: '#777777' },
  date: { color: '#555555', fontSize: 11 },
  title: { color: '#ededed', fontSize: 17, lineHeight: 24, fontWeight: '700', marginTop: 14 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 18 },
  summaryLabel: { color: '#5f5f5f', fontSize: 11, marginBottom: 5 }, summaryValue: { color: '#bdbdbd', fontSize: 14, fontWeight: '600' },
  priceArea: { alignItems: 'flex-end' }, price: { color: '#f5f5f5', fontSize: 18, fontWeight: '700' },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: '#29292e', marginTop: 16, paddingTop: 12 },
  footerText: { color: '#777777', fontSize: 12, fontWeight: '600' }, arrow: { color: '#888888', fontSize: 20, lineHeight: 20 },
});
