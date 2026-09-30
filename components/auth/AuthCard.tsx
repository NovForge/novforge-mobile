import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from './AuthCard.styles';

type Props = {
  onLogin: () => void;
  onStartSignup: () => void;
  onCompleteSignup: () => void;
  onGuestPress: () => void;
  onNicknameChange: (value: string) => void;
  nickname: string;
  signupStep: boolean;
  isLoading: boolean;
  googleEnabled: boolean;
  error: string | null;
};

export default function AuthCard(props: Props) {
  return (
    <View style={styles.authCard}>
      <View style={styles.authIcon}><Text style={styles.authIconText}>N</Text></View>
      <Text style={styles.authTitle}>NOVFORGE에 오신 것을 환영합니다</Text>
      <Text style={styles.authSubtitle}>Google 계정으로 가입하거나, 이미 가입한 계정으로 로그인하세요.</Text>
      {props.signupStep && <>
        <Text style={styles.signupGuide}>DB에 저장할 닉네임을 입력해 주세요.</Text>
        <TextInput style={styles.nicknameInput} value={props.nickname} onChangeText={props.onNicknameChange}
          placeholder="닉네임" placeholderTextColor="#64748b" maxLength={50} autoCapitalize="none" />
      </>}
      {props.error && <Text style={styles.errorText}>{props.error}</Text>}
      {props.signupStep ? (
        <TouchableOpacity style={[styles.primaryButton, props.isLoading && styles.disabledButton]}
          onPress={props.onCompleteSignup} disabled={props.isLoading}>
          {props.isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.primaryButtonText}>회원가입 완료</Text>}
        </TouchableOpacity>
      ) : <>
        <TouchableOpacity style={[styles.primaryButton, (!props.googleEnabled || props.isLoading) && styles.disabledButton]}
          onPress={props.onLogin} disabled={!props.googleEnabled || props.isLoading}>
          {props.isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.primaryButtonText}>Google로 로그인</Text>}
        </TouchableOpacity>
        <TouchableOpacity style={[styles.signupButton, (!props.googleEnabled || props.isLoading) && styles.disabledButton]}
          onPress={props.onStartSignup} disabled={!props.googleEnabled || props.isLoading}>
          <Text style={styles.signupButtonText}>Google로 회원가입</Text>
        </TouchableOpacity>
      </>}
      <TouchableOpacity style={styles.secondaryButton} onPress={props.onGuestPress} disabled={props.isLoading}>
        <Text style={styles.secondaryButtonText}>게스트로 둘러보기</Text>
      </TouchableOpacity>
    </View>
  );
}
