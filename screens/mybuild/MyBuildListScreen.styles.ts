import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#080d18' }, header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 18, paddingBottom: 16 },
  brand: { color: '#a78bfa', fontSize: 12, fontWeight: '800', letterSpacing: 2 }, title: { color: '#f8fafc', fontSize: 27, fontWeight: '900', marginTop: 4 }, subtitle: { color: '#64748b', fontSize: 13, marginTop: 5 },
  addButton: { width: 44, height: 44, borderRadius: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: '#7c3aed' }, addIcon: { color: '#fff', fontSize: 26, lineHeight: 28 },
  list: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 32 }, emptyList: { flexGrow: 1 }, center: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32, paddingBottom: 50 },
  stateIcon: { width: 64, height: 64, borderRadius: 22, alignItems: 'center', justifyContent: 'center', backgroundColor: '#171f31', borderWidth: 1, borderColor: '#2e3a52', marginBottom: 20 }, stateIconText: { color: '#a78bfa', fontSize: 25, fontWeight: '900' },
  stateTitle: { color: '#e2e8f0', fontSize: 18, fontWeight: '800', textAlign: 'center' }, stateBody: { color: '#64748b', fontSize: 14, lineHeight: 21, textAlign: 'center', marginTop: 9 },
  retryButton: { marginTop: 20, borderRadius: 999, backgroundColor: '#7c3aed', paddingHorizontal: 21, paddingVertical: 11 }, retryText: { color: '#fff', fontWeight: '800' }, primaryButton: { marginTop: 22, borderRadius: 14, backgroundColor: '#7c3aed', paddingHorizontal: 24, paddingVertical: 14 }, primaryButtonText: { color: '#fff', fontSize: 14, fontWeight: '800' },
});
