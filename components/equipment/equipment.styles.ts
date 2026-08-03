import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  tabBar: { maxHeight: 52, borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#172033' },
  tabContent: { paddingHorizontal: 14, alignItems: 'center' },
  tab: { paddingHorizontal: 16, paddingVertical: 15, marginRight: 4 },
  tabActive: { borderBottomWidth: 2, borderBottomColor: '#8b5cf6' },
  tabText: { color: '#64748b', fontSize: 14, fontWeight: '700' },
  tabTextActive: { color: '#c4b5fd' },
  card: { backgroundColor: '#111827', borderWidth: 1, borderColor: '#1e293b', borderRadius: 18, marginBottom: 12, overflow: 'hidden', flexDirection: 'row', minHeight: 118 },
  image: { width: 118, minHeight: 118, backgroundColor: '#1e293b' },
  imageFallback: { width: 118, minHeight: 118, backgroundColor: '#182235', alignItems: 'center', justifyContent: 'center' },
  imageFallbackText: { color: '#8b5cf6', fontSize: 20, fontWeight: '900' },
  cardBody: { flex: 1, padding: 15, justifyContent: 'center' },
  manufacturer: { color: '#64748b', fontSize: 11, fontWeight: '700', marginBottom: 5, textTransform: 'uppercase' },
  itemName: { color: '#f1f5f9', fontSize: 16, fontWeight: '700', lineHeight: 21, marginBottom: 10 },
  price: { color: '#a78bfa', fontSize: 16, fontWeight: '800' },
});
