import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#080d18' },
  center: { flex: 1, backgroundColor: '#080d18', alignItems: 'center', justifyContent: 'center', padding: 30 },
  error: { color: '#fca5a5', textAlign: 'center', fontSize: 16 },
  image: { width: '100%', height: 290, backgroundColor: '#1e293b' },
  imageFallback: { height: 240, backgroundColor: '#182235', alignItems: 'center', justifyContent: 'center' },
  imageFallbackText: { color: '#8b5cf6', fontSize: 38, fontWeight: '900' },
  body: { padding: 22, paddingBottom: 50 },
  manufacturer: { color: '#8b5cf6', fontSize: 12, fontWeight: '800', textTransform: 'uppercase' },
  name: { color: '#fff', fontSize: 25, fontWeight: '800', lineHeight: 32, marginTop: 7 },
  price: { color: '#c4b5fd', fontSize: 21, fontWeight: '800', marginTop: 12 },
  description: { color: '#94a3b8', fontSize: 14, lineHeight: 22, marginTop: 20 },
  specTitle: { color: '#f8fafc', fontSize: 17, fontWeight: '800', marginTop: 26, marginBottom: 10 },
  specRow: { flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#1e293b', paddingVertical: 11, gap: 20 },
  specLabel: { color: '#64748b', fontSize: 13, flex: 1 },
  specValue: { color: '#cbd5e1', fontSize: 13, fontWeight: '600', flex: 1, textAlign: 'right' },
});
