import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#0c0c0e' }, content: { flex: 1, padding: 20 }, label: { color: '#888888', fontSize: 12, fontWeight: '600', marginBottom: 9 },
  input: { backgroundColor: '#18181b', borderRadius: 9, color: '#e5e5e5', fontSize: 15, paddingHorizontal: 15, paddingVertical: 14 },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#18181b', borderRadius: 9, marginTop: 16, padding: 16 },
  switchTitle: { color: '#d4d4d4', fontSize: 14, fontWeight: '600' }, help: { color: '#5f5f5f', fontSize: 11, marginTop: 5 },
  button: { backgroundColor: '#ededed', borderRadius: 9, alignItems: 'center', padding: 15, marginTop: 24 }, disabled: { opacity: 0.55 }, buttonText: { color: '#111111', fontWeight: '700', fontSize: 14 },
});
