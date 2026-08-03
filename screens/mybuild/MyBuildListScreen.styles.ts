import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#0c0c0e' }, header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 20, paddingBottom: 18 },
  brand: { color: '#666666', fontSize: 10, fontWeight: '700', letterSpacing: 1.5 }, title: { color: '#f5f5f5', fontSize: 24, fontWeight: '700', marginTop: 4 }, subtitle: { color: '#777777', fontSize: 12, marginTop: 6 },
  addButton: { width: 38, height: 38, borderRadius: 9, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f1f1f1' }, addIcon: { color: '#111111', fontSize: 22, lineHeight: 24 },
  list: { paddingHorizontal: 16, paddingTop: 4, paddingBottom: 32 }, emptyList: { flexGrow: 1 }, center: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32, paddingBottom: 50 },
  stateIcon: { width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: '#222226', marginBottom: 18 }, stateIconText: { color: '#d4d4d4', fontSize: 19, fontWeight: '700' },
  stateTitle: { color: '#e5e5e5', fontSize: 17, fontWeight: '700', textAlign: 'center' }, stateBody: { color: '#666666', fontSize: 13, lineHeight: 20, textAlign: 'center', marginTop: 8 },
  retryButton: { marginTop: 20, borderRadius: 9, backgroundColor: '#f1f1f1', paddingHorizontal: 21, paddingVertical: 12 }, retryText: { color: '#111111', fontWeight: '700' }, primaryButton: { marginTop: 22, borderRadius: 9, backgroundColor: '#f1f1f1', paddingHorizontal: 24, paddingVertical: 14 }, primaryButtonText: { color: '#111111', fontSize: 14, fontWeight: '700' },
});
