import { useEffect, useState } from 'react';
import { Platform, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Google from 'expo-auth-session/providers/google';
import { makeRedirectUri } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { AuthCard } from '../../components/auth';
import { AuthSession, loginWithGoogle, signupWithGoogle } from '../../services/auth';
import { saveSession } from '../../services/session';
import { styles } from './AuthScreen.styles';

WebBrowser.maybeCompleteAuthSession();
type Props = { onAuthenticated: (session: AuthSession) => void; onGuest: () => void };
type AuthIntent = 'login' | 'signup' | null;

export default function AuthScreen({ onAuthenticated, onGuest }: Props) {
  const [intent, setIntent] = useState<AuthIntent>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [signupIdToken, setSignupIdToken] = useState<string | null>(null);
  const [nickname, setNickname] = useState('');
  const selectedClientId = Platform.select({ web: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID, android: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID, ios: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID });
  const hasClientId = Boolean(selectedClientId);
  const redirectUri = Platform.OS === 'web'
    ? (process.env.EXPO_PUBLIC_GOOGLE_WEB_REDIRECT_URI || makeRedirectUri({ path: 'oauthredirect' }))
    : makeRedirectUri({ scheme: 'novforge', path: 'oauthredirect' });
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: selectedClientId || 'missing-google-client-id', redirectUri,
    scopes: ['openid', 'profile', 'email'], selectAccount: true,
  });

  const login = async (idToken: string) => {
    setIsLoading(true);
    try {
      const session = await loginWithGoogle(idToken);
      await saveSession(session);
      onAuthenticated(session);
    } catch (cause) {
      const message = cause instanceof Error ? cause.message : '로그인에 실패했습니다.';
      setError(message.includes('가입되지 않은') ? '가입되지 않은 계정입니다. 먼저 회원가입해 주세요.' : message);
    } finally { setIsLoading(false); }
  };

  useEffect(() => {
    if (response?.type === 'success') {
      const idToken = response.params.id_token || response.authentication?.idToken;
      if (!idToken) setError('Google ID Token을 받지 못했습니다.');
      else if (intent === 'signup') { setSignupIdToken(idToken); setIsLoading(false); }
      else if (intent === 'login') void login(idToken);
    } else if (response?.type === 'error') {
      setIsLoading(false); setError(response.error?.message || 'Google 인증이 실패했습니다.');
    } else if (response?.type === 'cancel' || response?.type === 'dismiss') setIsLoading(false);
  }, [response, intent]);

  const startGoogle = async (nextIntent: Exclude<AuthIntent, null>) => {
    setError(null);
    if (!hasClientId) { setError(`${Platform.OS}용 Google Client ID가 설정되지 않았습니다.`); return; }
    setIntent(nextIntent); setIsLoading(true);
    try { await promptAsync(); }
    catch (cause) { setIsLoading(false); setError(cause instanceof Error ? cause.message : 'Google 인증 창을 열지 못했습니다.'); }
  };

  const completeSignup = async () => {
    if (!signupIdToken || !nickname.trim()) { setError('닉네임을 입력해 주세요.'); return; }
    setIsLoading(true); setError(null);
    try { await signupWithGoogle(signupIdToken, nickname.trim()); await login(signupIdToken); }
    catch (cause) { setError(cause instanceof Error ? cause.message : '회원가입에 실패했습니다.'); setIsLoading(false); }
  };

  return <SafeAreaView style={styles.authScreen}>
    <StatusBar style="light" />
    <AuthCard onLogin={() => void startGoogle('login')} onStartSignup={() => void startGoogle('signup')}
      onCompleteSignup={() => void completeSignup()} onGuestPress={onGuest} onNicknameChange={setNickname}
      nickname={nickname} signupStep={Boolean(signupIdToken)} isLoading={isLoading}
      googleEnabled={Boolean(request) && hasClientId} error={error} />
  </SafeAreaView>;
}
