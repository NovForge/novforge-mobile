import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native';
import { AuthSession } from '../../services/auth';
import { styles } from './MyPageCard.styles';

type Props = { session: AuthSession | null; profileUploading: boolean; profileError: string | null; onEdit: () => void; onProfileImagePress: () => void; onWithdraw: () => void; onExit: () => void };

export default function MyPageCard({ session, profileUploading, profileError, onEdit, onProfileImagePress, onWithdraw, onExit }: Props) {
  const avatar = session?.user.profileImage ? <Image source={{ uri: session.user.profileImage }} style={styles.avatar} /> :
    <View style={styles.avatarFallback}><Text style={styles.avatarText}>{session?.user.userNickname?.slice(0, 1) || 'G'}</Text></View>;

  return <View>
    <View style={styles.header}><Text style={styles.eyebrow}>NOVFORGE</Text><Text style={styles.title}>마이페이지</Text></View>
    <View style={styles.card}>
      <TouchableOpacity onPress={onProfileImagePress} disabled={!session || profileUploading} accessibilityLabel="프로필 사진 변경" style={styles.avatarButton}>
        {avatar}
        {profileUploading ? <View style={styles.uploadOverlay}><ActivityIndicator color="#ffffff" /></View> : null}
        {session && !profileUploading ? <View style={styles.cameraBadge}><Text style={styles.cameraMark}>+</Text></View> : null}
      </TouchableOpacity>
      <Text style={styles.nickname}>{session?.user.userNickname || '게스트'}</Text>
      <Text style={styles.email}>{session?.user.userEmail || '로그인하지 않은 사용자입니다.'}</Text>
      {session ? <TouchableOpacity style={styles.editProfileButton} onPress={onEdit}><Text style={styles.editProfileText}>내 정보 수정</Text></TouchableOpacity> : null}
      {profileError ? <Text style={styles.profileError}>{profileError}</Text> : null}
    </View>
    <TouchableOpacity style={styles.logoutButton} onPress={onExit}><Text style={styles.logoutText}>{session ? '로그아웃' : '로그인 화면으로'}</Text></TouchableOpacity>
    {session ? <TouchableOpacity style={styles.withdrawButton} onPress={onWithdraw}><Text style={styles.withdrawText}>회원탈퇴</Text></TouchableOpacity> : null}
  </View>;
}
