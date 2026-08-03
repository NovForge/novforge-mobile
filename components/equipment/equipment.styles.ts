import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  tabBar: { maxHeight: 48, borderBottomWidth: 1, borderColor: '#27272a' },
  tabContent: { paddingHorizontal: 14, alignItems: 'center' },
  tab: { paddingHorizontal: 15, paddingVertical: 13, marginRight: 3 },
  tabActive: { borderBottomWidth: 1, borderBottomColor: '#d4d4d4' },
  tabText: { color: '#555555', fontSize: 13, fontWeight: '600' },
  tabTextActive: { color: '#d4d4d4' },
  card: { backgroundColor: '#18181b', borderRadius: 10, marginBottom: 8, overflow: 'hidden', flexDirection: 'row', minHeight: 108 },
  image: { width: 108, minHeight: 108, backgroundColor: '#222226' },
  imageFallback: { width: 108, minHeight: 108, backgroundColor: '#222226', alignItems: 'center', justifyContent: 'center' },
  imageFallbackText: { color: '#777777', fontSize: 17, fontWeight: '700' },
  cardBody: { flex: 1, padding: 15, justifyContent: 'center' },
  manufacturer: { color: '#555555', fontSize: 10, fontWeight: '600', marginBottom: 5, textTransform: 'uppercase' },
  itemName: { color: '#dedede', fontSize: 15, fontWeight: '600', lineHeight: 20, marginBottom: 9 },
  price: { color: '#bdbdbd', fontSize: 14, fontWeight: '700' },
});
