import { useEffect, useState } from 'react';
import { AppRouter } from './router';
import { AuthSession, clearSession, loadSession } from './services/auth';

export default function App() {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => { loadSession().then(setSession); }, []);

  const exit = async () => {
    await clearSession();
    setSession(null);
    setIsGuest(false);
  };

  return <AppRouter session={session} isGuest={isGuest} onAuthenticated={setSession} onGuest={() => setIsGuest(true)} onSessionChange={setSession} onExit={() => void exit()} />;
}
