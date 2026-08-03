import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#0c0c0e' },
  header: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 16 },
  brand: { color: '#555555', fontSize: 10, fontWeight: '700', letterSpacing: 1.5 },
  title: { color: '#ededed', fontSize: 24, fontWeight: '700', marginTop: 4 },
  list: { padding: 16, paddingBottom: 40 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 30 },
  stateTitle: { color: '#d4d4d4', fontSize: 17, fontWeight: '700', textAlign: 'center' },
  stateBody: { color: '#5f5f5f', fontSize: 13, textAlign: 'center', marginTop: 8 },
  retryButton: { marginTop: 18, backgroundColor: '#ededed', borderRadius: 9, paddingHorizontal: 20, paddingVertical: 11 },
  retryText: { color: '#111111', fontWeight: '700' },
});
