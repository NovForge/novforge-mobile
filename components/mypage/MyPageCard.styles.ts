import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  header: { marginTop: 16, marginBottom: 24 },
  eyebrow: { color: '#555555', fontSize: 10, fontWeight: '700', letterSpacing: 1.5 },
  title: { color: '#ededed', fontSize: 24, fontWeight: '700', marginTop: 5 },
  card: { backgroundColor: '#18181b', borderRadius: 11, padding: 24, alignItems: 'center' },
  avatar: { width: 82, height: 82, borderRadius: 41, marginBottom: 14 },
  avatarFallback: { width: 76, height: 76, borderRadius: 38, backgroundColor: '#ededed', alignItems: 'center', justifyContent: 'center', marginBottom: 14 },
  avatarText: { color: '#111111', fontSize: 27, fontWeight: '700' },
  nickname: { color: '#ededed', fontSize: 20, fontWeight: '700' },
  email: { color: '#666666', fontSize: 12, marginTop: 6 },
  logoutButton: { marginTop: 18, borderWidth: 1, borderColor: '#303036', borderRadius: 9, paddingVertical: 13, alignItems: 'center' },
  logoutText: { color: '#999999', fontWeight: '600' },
});
