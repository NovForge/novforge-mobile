import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { AuthScreen } from './screens';
import { AuthSession } from './services/auth';
import { clearSession, loadSession } from './services/session';

export default function App() {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    loadSession().then(setSession);
  }, []);

  if (!session && !isGuest) {
    return <AuthScreen onAuthenticated={setSession} onGuest={() => setIsGuest(true)} />;
  }

  const exit = async () => {
    await clearSession();
    setSession(null);
    setIsGuest(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{session ? '로그인 완료' : '게스트 모드'}</Text>
      {session && <Text style={styles.user}>{session.user.userNickname}</Text>}
      <TouchableOpacity style={styles.button} onPress={() => void exit()}>
        <Text style={styles.buttonText}>{session ? '로그아웃' : '로그인 화면으로'}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b1120', alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { color: '#fff', fontSize: 24, fontWeight: '700', marginBottom: 8 },
  user: { color: '#94a3b8', fontSize: 16, marginBottom: 24 },
  button: { backgroundColor: '#8b5cf6', borderRadius: 999, paddingHorizontal: 24, paddingVertical: 12, marginTop: 16 },
  buttonText: { color: '#fff', fontWeight: '700' },
});
