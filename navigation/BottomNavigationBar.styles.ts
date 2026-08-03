import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flexDirection: 'row', backgroundColor: '#0d1422', borderTopWidth: 1, borderTopColor: '#1e293b', paddingTop: 8, paddingBottom: 10 },
  item: { flex: 1, alignItems: 'center', gap: 4 },
  mark: { width: 30, height: 25, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  markActive: { backgroundColor: '#7c3aed' },
  markText: { color: '#64748b', fontSize: 12, fontWeight: '900' },
  markTextActive: { color: '#fff' },
  label: { color: '#64748b', fontSize: 11, fontWeight: '700' },
  labelActive: { color: '#c4b5fd' },
});
