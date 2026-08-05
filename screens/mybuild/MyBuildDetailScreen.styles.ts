import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background }, center: { flex: 1, alignItems: 'center', justifyContent: 'center' }, content: { padding: 16, paddingBottom: 45 },
  priceCard: { backgroundColor: colors.primaryMuted, borderWidth: 1, borderColor: colors.borderStrong, borderRadius: 8, padding: 20 }, priceLabel: { color: colors.textMuted, fontSize: 11, fontWeight: '600' }, price: { color: colors.primary, fontSize: 25, fontWeight: '700', marginTop: 7 },
  sectionTitle: { color: colors.textSecondary, fontSize: 15, fontWeight: '700', marginTop: 24, marginBottom: 9 }, panel: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 8, padding: 14 },
  input: { color: '#e5e5e5', backgroundColor: '#242428', borderRadius: 8, padding: 12, fontSize: 14 }, publicRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 13 }, rowTitle: { color: '#bdbdbd', fontWeight: '600' },
  readOnlyName: { color: '#ededed', fontSize: 17, lineHeight: 24, fontWeight: '700' }, publicValue: { color: '#aebc8c', fontSize: 12, fontWeight: '700' },
  saveButton: { alignItems: 'center', backgroundColor: colors.primary, padding: 12, borderRadius: 7 }, saveText: { color: colors.primaryInk, fontWeight: '800' },
  partCard: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 8, padding: 14, marginBottom: 8 }, partTop: { flexDirection: 'row', justifyContent: 'space-between' }, partLabel: { color: colors.textMuted, fontSize: 11, fontWeight: '600' }, changeText: { color: colors.primary, fontSize: 12, fontWeight: '700' },
  partLine: { flexDirection: 'row', alignItems: 'center', marginTop: 11 }, partInfo: { flex: 1 }, partName: { color: '#dedede', fontSize: 14, fontWeight: '600' }, partPrice: { color: '#666666', fontSize: 11, marginTop: 4 }, removeText: { color: '#777777', fontSize: 11, fontWeight: '600', padding: 8 }, emptyPart: { color: '#505050', fontSize: 12, marginTop: 12 },
  deleteButton: { alignItems: 'center', borderWidth: 1, borderColor: '#303036', padding: 14, borderRadius: 9, marginTop: 24 }, deleteText: { color: '#777777', fontWeight: '600' },
});
