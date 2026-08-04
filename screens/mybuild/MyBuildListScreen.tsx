import { useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MyBuildCard } from '../../components/mybuild';
import { fetchMyBuilds, fetchPublicBuilds, MyBuild } from '../../services/mybuild';
import { styles } from './MyBuildListScreen.styles';
import { RootStackParamList } from '../../router/routes';

type Props = { accessToken?: string };
type ListMode = 'public' | 'mine';
type VisibilityFilter = 'all' | 'public' | 'private';

export default function MyBuildListScreen({ accessToken }: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [builds, setBuilds] = useState<MyBuild[]>([]);
  const [loading, setLoading] = useState(Boolean(accessToken));
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<ListMode>('public');
  const [filter, setFilter] = useState<VisibilityFilter>('all');
  const load = useCallback(async (refresh = false) => {
    if (!accessToken) return;
    refresh ? setRefreshing(true) : setLoading(true); setError(null);
    try { setBuilds(mode === 'public' ? await fetchPublicBuilds() : await fetchMyBuilds(accessToken)); }
    catch (cause) { setError(cause instanceof Error ? cause.message : '견적을 불러오지 못했습니다.'); }
    finally { setLoading(false); setRefreshing(false); }
  }, [accessToken, mode]);
  useFocusEffect(useCallback(() => { void load(); }, [load]));
  const visibleBuilds = useMemo(() => mode === 'mine' && filter !== 'all'
    ? builds.filter((build) => build.publicBuild === (filter === 'public'))
    : builds, [builds, filter, mode]);
  const header = <><View style={styles.header}><View><Text style={styles.brand}>NOVFORGE</Text><Text style={styles.title}>{mode === 'public' ? '공개 견적' : '내 견적'}</Text><Text style={styles.subtitle}>{mode === 'public' ? '다른 사용자가 공개한 PC 구성을 둘러보세요.' : '나만의 PC 구성을 저장하고 관리하세요.'}</Text></View>{accessToken && mode === 'mine' ? <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('MyBuildCreate')} accessibilityLabel="새 견적 만들기"><Text style={styles.addIcon}>＋</Text></TouchableOpacity> : null}</View><View style={styles.modeTabs}>{(['public', 'mine'] as const).map((value) => <TouchableOpacity key={value} style={[styles.modeTab, mode === value && styles.modeTabActive]} onPress={() => setMode(value)}><Text style={[styles.modeTabText, mode === value && styles.modeTabTextActive]}>{value === 'public' ? '공개 견적' : '내 견적'}</Text></TouchableOpacity>)}</View>{mode === 'mine' ? <View style={styles.filters}>{(['all', 'public', 'private'] as const).map((value) => <TouchableOpacity key={value} style={[styles.filter, filter === value && styles.filterActive]} onPress={() => setFilter(value)}><Text style={[styles.filterText, filter === value && styles.filterTextActive]}>{value === 'all' ? '전체' : value === 'public' ? '공개' : '비공개'}</Text></TouchableOpacity>)}</View> : null}</>;
  if (!accessToken) return <SafeAreaView style={styles.screen}><StatusBar style="light" />{header}<View style={styles.center}><View style={styles.stateIcon}><Text style={styles.stateIconText}>N</Text></View><Text style={styles.stateTitle}>로그인이 필요해요</Text><Text style={styles.stateBody}>내 견적을 저장하고 여러 기기에서 관리하려면 로그인해 주세요.</Text></View></SafeAreaView>;
  return <SafeAreaView style={styles.screen}><StatusBar style="light" />{header}{loading ? <View style={styles.center}><ActivityIndicator size="large" color="#888888" /></View> : error ? <View style={styles.center}><Text style={styles.stateTitle}>잠시 문제가 생겼어요</Text><Text style={styles.stateBody}>{error}</Text><TouchableOpacity style={styles.retryButton} onPress={() => void load()}><Text style={styles.retryText}>다시 시도</Text></TouchableOpacity></View> : <FlatList data={visibleBuilds} keyExtractor={(item) => String(item.buildId)} contentContainerStyle={[styles.list, visibleBuilds.length === 0 && styles.emptyList]} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => void load(true)} tintColor="#888888" colors={['#888888']} />} ListEmptyComponent={<View style={styles.center}><View style={styles.stateIcon}><Text style={styles.stateIconText}>{mode === 'public' ? 'N' : '＋'}</Text></View><Text style={styles.stateTitle}>{mode === 'public' ? '공개된 견적이 없어요' : filter === 'all' ? '아직 저장한 견적이 없어요' : `${filter === 'public' ? '공개' : '비공개'} 견적이 없어요`}</Text><Text style={styles.stateBody}>{mode === 'public' ? '새로운 공개 견적이 등록되면 이곳에서 확인할 수 있어요.' : filter === 'all' ? '첫 번째 PC 견적을 만들고 원하는 부품을 하나씩 담아보세요.' : '다른 공개 범위를 선택하거나 새 견적을 만들어 보세요.'}</Text>{mode === 'mine' && filter === 'all' ? <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('MyBuildCreate')}><Text style={styles.primaryButtonText}>새 견적 만들기</Text></TouchableOpacity> : null}</View>} renderItem={({ item }) => <MyBuildCard build={item} onPress={() => navigation.navigate(mode === 'public' ? 'PublicMyBuildDetail' : 'MyBuildDetail', { buildId: item.buildId })} />} />}</SafeAreaView>;
}
