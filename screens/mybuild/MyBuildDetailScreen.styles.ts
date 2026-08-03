import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#080d18' }, center: { flex: 1, alignItems: 'center', justifyContent: 'center' }, content: { padding: 16, paddingBottom: 45 },
  priceCard: { backgroundColor: '#4c1d95', borderRadius: 20, padding: 22 }, priceLabel: { color: '#c4b5fd', fontSize: 13, fontWeight: '700' }, price: { color: '#fff', fontSize: 27, fontWeight: '900', marginTop: 7 },
  sectionTitle: { color: '#f8fafc', fontSize: 17, fontWeight: '900', marginTop: 25, marginBottom: 10 }, panel: { backgroundColor: '#111a2b', borderRadius: 16, padding: 14 },
  input: { color: '#f8fafc', borderWidth: 1, borderColor: '#334155', borderRadius: 11, padding: 12, fontSize: 15 }, publicRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 13 }, rowTitle: { color: '#cbd5e1', fontWeight: '700' },
  saveButton: { alignItems: 'center', backgroundColor: '#7c3aed', padding: 12, borderRadius: 11 }, saveText: { color: '#fff', fontWeight: '800' },
  partCard: { backgroundColor: '#111a2b', borderWidth: 1, borderColor: '#1e293b', borderRadius: 15, padding: 14, marginBottom: 10 }, partTop: { flexDirection: 'row', justifyContent: 'space-between' }, partLabel: { color: '#94a3b8', fontSize: 12, fontWeight: '800' }, changeText: { color: '#a78bfa', fontSize: 13, fontWeight: '800' },
  partLine: { flexDirection: 'row', alignItems: 'center', marginTop: 11 }, partInfo: { flex: 1 }, partName: { color: '#f1f5f9', fontSize: 14, fontWeight: '700' }, partPrice: { color: '#64748b', fontSize: 12, marginTop: 4 }, removeText: { color: '#fb7185', fontSize: 12, padding: 8 }, emptyPart: { color: '#475569', fontSize: 13, marginTop: 12 },
  deleteButton: { alignItems: 'center', borderWidth: 1, borderColor: '#7f1d1d', padding: 14, borderRadius: 13, marginTop: 24 }, deleteText: { color: '#f87171', fontWeight: '800' },
});
