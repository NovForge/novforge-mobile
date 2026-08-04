import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, SafeAreaView, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MyBuildReadOnlyDetail } from '../../components/mybuild';
import { RootStackParamList } from '../../router/routes';
import { fetchPublicBuild, MyBuild } from '../../services/mybuild';
import { styles } from './MyBuildDetailScreen.styles';

type Props = NativeStackScreenProps<RootStackParamList, 'PublicMyBuildDetail'>;

export default function PublicMyBuildDetailScreen({ route, navigation }: Props) {
  const [build, setBuild] = useState<MyBuild | null>(null);
  const [loading, setLoading] = useState(true);
  const load = useCallback(async () => {
    setLoading(true);
    try { setBuild(await fetchPublicBuild(route.params.buildId)); }
    catch (cause) {
      Alert.alert('조회 실패', cause instanceof Error ? cause.message : '공개 견적을 찾지 못했습니다.', [{ text: '확인', onPress: () => navigation.goBack() }]);
    } finally { setLoading(false); }
  }, [navigation, route.params.buildId]);
  useFocusEffect(useCallback(() => { void load(); }, [load]));
  useEffect(() => navigation.setOptions({ title: build?.buildName || '공개 견적' }), [build?.buildName, navigation]);

  if (loading || !build) return <SafeAreaView style={styles.screen}><View style={styles.center}><ActivityIndicator size="large" color="#ffffff" /></View></SafeAreaView>;
  return <SafeAreaView style={styles.screen}><MyBuildReadOnlyDetail build={build} /></SafeAreaView>;
}
