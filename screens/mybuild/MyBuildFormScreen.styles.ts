import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#080d18' }, content: { padding: 20 }, label: { color: '#cbd5e1', fontSize: 13, fontWeight: '800', marginBottom: 9 },
  input: { backgroundColor: '#111a2b', borderColor: '#293548', borderWidth: 1, borderRadius: 14, color: '#f8fafc', fontSize: 16, paddingHorizontal: 15, paddingVertical: 14 },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#111a2b', borderRadius: 14, marginTop: 18, padding: 16 },
  switchTitle: { color: '#e2e8f0', fontSize: 15, fontWeight: '800' }, help: { color: '#64748b', fontSize: 12, marginTop: 5 },
  button: { backgroundColor: '#7c3aed', borderRadius: 14, alignItems: 'center', padding: 15, marginTop: 24 }, disabled: { opacity: 0.55 }, buttonText: { color: '#fff', fontWeight: '900', fontSize: 15 },
});
