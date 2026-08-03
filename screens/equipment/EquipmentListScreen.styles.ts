import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#080d18' },
  header: { paddingHorizontal: 20, paddingTop: 18, paddingBottom: 14 },
  brand: { color: '#a78bfa', fontSize: 12, fontWeight: '800', letterSpacing: 2 },
  title: { color: '#f8fafc', fontSize: 24, fontWeight: '800', marginTop: 4 },
  list: { padding: 16, paddingBottom: 40 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 30 },
  stateTitle: { color: '#e2e8f0', fontSize: 17, fontWeight: '700', textAlign: 'center' },
  stateBody: { color: '#64748b', fontSize: 14, textAlign: 'center', marginTop: 8 },
  retryButton: { marginTop: 18, backgroundColor: '#8b5cf6', borderRadius: 999, paddingHorizontal: 20, paddingVertical: 10 },
  retryText: { color: '#fff', fontWeight: '700' },
});
