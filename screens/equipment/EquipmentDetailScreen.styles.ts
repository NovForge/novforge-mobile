import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#0c0c0e' },
  center: { flex: 1, backgroundColor: '#0c0c0e', alignItems: 'center', justifyContent: 'center', padding: 30 },
  error: { color: '#fca5a5', textAlign: 'center', fontSize: 16 },
  image: { width: '100%', height: 270, backgroundColor: '#18181b' },
  imageFallback: { height: 220, backgroundColor: '#18181b', alignItems: 'center', justifyContent: 'center' },
  imageFallbackText: { color: '#555555', fontSize: 34, fontWeight: '700' },
  body: { padding: 22, paddingBottom: 50 },
  manufacturer: { color: '#666666', fontSize: 10, fontWeight: '600', textTransform: 'uppercase' },
  name: { color: '#ededed', fontSize: 24, fontWeight: '700', lineHeight: 31, marginTop: 7 },
  price: { color: '#d4d4d4', fontSize: 20, fontWeight: '700', marginTop: 12 },
  description: { color: '#777777', fontSize: 13, lineHeight: 21, marginTop: 20 },
  specTitle: { color: '#d4d4d4', fontSize: 15, fontWeight: '700', marginTop: 26, marginBottom: 10 },
  specRow: { flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#27272a', paddingVertical: 11, gap: 20 },
  specLabel: { color: '#555555', fontSize: 12, flex: 1 },
  specValue: { color: '#a3a3a3', fontSize: 12, fontWeight: '600', flex: 1, textAlign: 'right' },
});
