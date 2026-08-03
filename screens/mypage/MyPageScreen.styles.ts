import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#080d18', padding: 20 },
  header: { marginTop: 16, marginBottom: 24 },
  eyebrow: { color: '#a78bfa', fontSize: 12, fontWeight: '800', letterSpacing: 2 },
  title: { color: '#f8fafc', fontSize: 26, fontWeight: '800', marginTop: 5 },
  card: { backgroundColor: '#111827', borderRadius: 22, borderWidth: 1, borderColor: '#1e293b', padding: 24, alignItems: 'center' },
  avatar: { width: 82, height: 82, borderRadius: 41, marginBottom: 14 },
  avatarFallback: { width: 82, height: 82, borderRadius: 41, backgroundColor: '#7c3aed', alignItems: 'center', justifyContent: 'center', marginBottom: 14 },
  avatarText: { color: '#fff', fontSize: 30, fontWeight: '900' },
  nickname: { color: '#fff', fontSize: 21, fontWeight: '800' },
  email: { color: '#64748b', fontSize: 13, marginTop: 6 },
  logoutButton: { marginTop: 18, borderWidth: 1, borderColor: '#475569', borderRadius: 999, paddingVertical: 13, alignItems: 'center' },
  logoutText: { color: '#e2e8f0', fontWeight: '700' },
});
