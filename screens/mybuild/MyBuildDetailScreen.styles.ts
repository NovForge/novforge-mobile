import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#0c0c0e' }, center: { flex: 1, alignItems: 'center', justifyContent: 'center' }, content: { padding: 16, paddingBottom: 45 },
  priceCard: { backgroundColor: '#18181b', borderRadius: 11, padding: 20 }, priceLabel: { color: '#666666', fontSize: 11, fontWeight: '600' }, price: { color: '#f5f5f5', fontSize: 25, fontWeight: '700', marginTop: 7 },
  sectionTitle: { color: '#d4d4d4', fontSize: 15, fontWeight: '700', marginTop: 24, marginBottom: 9 }, panel: { backgroundColor: '#18181b', borderRadius: 11, padding: 14 },
  input: { color: '#e5e5e5', backgroundColor: '#242428', borderRadius: 8, padding: 12, fontSize: 14 }, publicRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 13 }, rowTitle: { color: '#bdbdbd', fontWeight: '600' },
  saveButton: { alignItems: 'center', backgroundColor: '#ededed', padding: 12, borderRadius: 8 }, saveText: { color: '#111111', fontWeight: '700' },
  partCard: { backgroundColor: '#18181b', borderRadius: 10, padding: 14, marginBottom: 8 }, partTop: { flexDirection: 'row', justifyContent: 'space-between' }, partLabel: { color: '#666666', fontSize: 11, fontWeight: '600' }, changeText: { color: '#bdbdbd', fontSize: 12, fontWeight: '600' },
  partLine: { flexDirection: 'row', alignItems: 'center', marginTop: 11 }, partInfo: { flex: 1 }, partName: { color: '#dedede', fontSize: 14, fontWeight: '600' }, partPrice: { color: '#666666', fontSize: 11, marginTop: 4 }, removeText: { color: '#777777', fontSize: 11, fontWeight: '600', padding: 8 }, emptyPart: { color: '#505050', fontSize: 12, marginTop: 12 },
  deleteButton: { alignItems: 'center', borderWidth: 1, borderColor: '#303036', padding: 14, borderRadius: 9, marginTop: 24 }, deleteText: { color: '#777777', fontWeight: '600' },
});
