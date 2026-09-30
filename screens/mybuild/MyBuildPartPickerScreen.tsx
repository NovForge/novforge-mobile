import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { EquipmentSearchBar } from '../../components/equipment';
import { EquipmentItem, EQUIPMENT_CATEGORIES, fetchEquipment, searchEquipment } from '../../services/equipment';
import { addPartToMyBuild, fetchMyBuild } from '../../services/mybuild';
import { RootStackParamList } from '../../router/routes';
import { styles } from './MyBuildPartPickerScreen.styles';

type Props = NativeStackScreenProps<RootStackParamList, 'MyBuildPartPicker'> & { accessToken: string };
const searchTypes: Record<string, string> = { cpu: 'CPU', gpu: 'GPU', motherboard: 'MOTHERBOARD', memory: 'MEMORY', storage: 'STORAGE', power: 'POWER_SUPPLY', cooler: 'CPU_COOLER', case: 'CASE' };

export default function MyBuildPartPickerScreen({ route, navigation, accessToken }: Props) {
  const category = EQUIPMENT_CATEGORIES.find((value) => value.key === route.params.categoryKey);
  const [items, setItems] = useState<EquipmentItem[]>([]);
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<number | null>(null);

  const load = useCallback(async () => {
    if (!category) return;
    setLoading(true);
    try { setItems(await fetchEquipment(category, accessToken)); }
    catch (cause) { Alert.alert('조회 실패', cause instanceof Error ? cause.message : '부품을 불러오지 못했습니다.'); }
    finally { setLoading(false); }
  }, [accessToken, category]);

  useEffect(() => { navigation.setOptions({ title: `${category?.label || '부품'} 선택` }); }, [category?.label, navigation]);
  useEffect(() => {
    const query = keyword.trim();
    if (!query) { void load(); return; }
    if (!category) return;
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const results = await searchEquipment(query, accessToken);
        setItems(results.filter((item) => item.type === searchTypes[category.key]));
      } catch (cause) { Alert.alert('검색 실패', cause instanceof Error ? cause.message : '검색 결과를 불러오지 못했습니다.'); }
      finally { setLoading(false); }
    }, 300);
    return () => clearTimeout(timer);
  }, [accessToken, category, keyword, load]);

  const select = async (item: EquipmentItem) => {
    if (!category) return;
    setSavingId(item.id);
    try {
      const build = await fetchMyBuild(route.params.buildId, accessToken);
      await addPartToMyBuild(build, category.key, item.id, accessToken);
      navigation.goBack();
    } catch (cause) { Alert.alert('추가 실패', cause instanceof Error ? cause.message : '부품을 추가하지 못했습니다.'); }
    finally { setSavingId(null); }
  };

  if (!category) return <SafeAreaView style={styles.screen}><View style={styles.center}><Text style={styles.error}>지원하지 않는 부품입니다.</Text></View></SafeAreaView>;
  return <SafeAreaView style={styles.screen}>
    <View style={styles.search}><EquipmentSearchBar value={keyword} onChangeText={setKeyword} placeholder={`${category.label} 검색`} /></View>
    {loading ? <View style={styles.center}><ActivityIndicator size="large" color="#ffffff" /></View> : <FlatList
      data={items}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={styles.list}
      ListEmptyComponent={<View style={styles.center}><Text style={styles.error}>{keyword.trim() ? '검색 결과가 없습니다.' : '등록된 부품이 없습니다.'}</Text></View>}
      renderItem={({ item }) => <TouchableOpacity style={styles.item} onPress={() => void select(item)} disabled={savingId !== null}>
        <View style={styles.itemBody}><Text style={styles.maker}>{item.manufacturer}</Text><Text style={styles.name}>{item.name}</Text><Text style={styles.price}>{Number(item.price).toLocaleString('ko-KR')}원</Text></View>
        <Text style={styles.action}>{savingId === item.id ? '반영 중' : '선택'}</Text>
      </TouchableOpacity>}
    />}
  </SafeAreaView>;
}
