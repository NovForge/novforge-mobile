import { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MyBuildCard } from '../../components/mybuild';
import { fetchMyBuilds, MyBuild } from '../../services/mybuild';
import { styles } from './MyBuildListScreen.styles';
import { RootStackParamList } from '../../router/routes';

type Props = { accessToken?: string };

export default function MyBuildListScreen({ accessToken }: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [builds, setBuilds] = useState<MyBuild[]>([]);
  const [loading, setLoading] = useState(Boolean(accessToken));
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const load = useCallback(async (refresh = false) => {
    if (!accessToken) return;
    refresh ? setRefreshing(true) : setLoading(true); setError(null);
    try { setBuilds(await fetchMyBuilds(accessToken)); }
    catch (cause) { setError(cause instanceof Error ? cause.message : '내 견적을 불러오지 못했습니다.'); }
    finally { setLoading(false); setRefreshing(false); }
  }, [accessToken]);
  useFocusEffect(useCallback(() => { void load(); }, [load]));
  const header = <View style={styles.header}><View><Text style={styles.brand}>NOVFORGE</Text><Text style={styles.title}>내 견적</Text><Text style={styles.subtitle}>나만의 PC 구성을 저장하고 관리하세요.</Text></View>{accessToken ? <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('MyBuildCreate')}><Text style={styles.addIcon}>＋</Text></TouchableOpacity> : null}</View>;
  if (!accessToken) return <SafeAreaView style={styles.screen}><StatusBar style="light" />{header}<View style={styles.center}><View style={styles.stateIcon}><Text style={styles.stateIconText}>N</Text></View><Text style={styles.stateTitle}>로그인이 필요해요</Text><Text style={styles.stateBody}>내 견적을 저장하고 여러 기기에서 관리하려면 로그인해 주세요.</Text></View></SafeAreaView>;
  return <SafeAreaView style={styles.screen}><StatusBar style="light" />{header}{loading ? <View style={styles.center}><ActivityIndicator size="large" color="#888888" /></View> : error ? <View style={styles.center}><Text style={styles.stateTitle}>잠시 문제가 생겼어요</Text><Text style={styles.stateBody}>{error}</Text><TouchableOpacity style={styles.retryButton} onPress={() => void load()}><Text style={styles.retryText}>다시 시도</Text></TouchableOpacity></View> : <FlatList data={builds} keyExtractor={(item) => String(item.buildId)} contentContainerStyle={[styles.list, builds.length === 0 && styles.emptyList]} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => void load(true)} tintColor="#888888" colors={['#888888']} />} ListEmptyComponent={<View style={styles.center}><View style={styles.stateIcon}><Text style={styles.stateIconText}>＋</Text></View><Text style={styles.stateTitle}>아직 저장한 견적이 없어요</Text><Text style={styles.stateBody}>첫 번째 PC 견적을 만들고 원하는 부품을 하나씩 담아보세요.</Text><TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('MyBuildCreate')}><Text style={styles.primaryButtonText}>새 견적 만들기</Text></TouchableOpacity></View>} renderItem={({ item }) => <MyBuildCard build={item} onPress={() => navigation.navigate('MyBuildDetail', { buildId: item.buildId })} />} />}</SafeAreaView>;
}
