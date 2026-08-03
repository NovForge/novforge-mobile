import { SafeAreaView } from 'react-native';
import { MyPageCard } from '../../components/mypage';
import { AuthSession } from '../../services/auth';
import { styles } from './MyPageScreen.styles';

type Props = { session: AuthSession | null; onExit: () => void };

export default function MyPageScreen({ session, onExit }: Props) {
  return (
    <SafeAreaView style={styles.screen}>
      <MyPageCard session={session} onExit={onExit} />
    </SafeAreaView>
  );
}
