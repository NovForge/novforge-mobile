import { Image, Text, TouchableOpacity, View } from 'react-native';
import { AuthSession } from '../../services/auth';
import { styles } from './MyPageCard.styles';

type Props = {
  session: AuthSession | null;
  onExit: () => void;
};

export default function MyPageCard({ session, onExit }: Props) {
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>NOVFORGE</Text>
        <Text style={styles.title}>마이페이지</Text>
      </View>
      <View style={styles.card}>
        {session?.user.profileImage ? (
          <Image source={{ uri: session.user.profileImage }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarFallback}>
            <Text style={styles.avatarText}>{session?.user.userNickname?.slice(0, 1) || 'G'}</Text>
          </View>
        )}
        <Text style={styles.nickname}>{session?.user.userNickname || '게스트'}</Text>
        <Text style={styles.email}>{session?.user.userEmail || '로그인하지 않은 사용자입니다.'}</Text>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={onExit}>
        <Text style={styles.logoutText}>{session ? '로그아웃' : '로그인 화면으로'}</Text>
      </TouchableOpacity>
    </View>
  );
}
