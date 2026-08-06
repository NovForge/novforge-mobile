import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { CategoryTabs, EquipmentCard } from '../../components/equipment';
import { EQUIPMENT_CATEGORIES, EquipmentCategory, EquipmentItem, EquipmentSearchItem, fetchEquipment, searchEquipment } from '../../services/equipment';
import { RootStackParamList } from '../../router/routes';
import { styles } from './EquipmentListScreen.styles';

type Props = { accessToken?: string };

const SEARCH_TYPE_TO_CATEGORY: Record<string, string> = {
  CPU: 'cpu', GPU: 'gpu', MEMORY: 'memory', STORAGE: 'storage',
  MOTHERBOARD: 'motherboard', POWER_SUPPLY: 'power', CPU_COOLER: 'cooler', CASE: 'case',
};

export default function EquipmentListScreen({ accessToken }: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [category, setCategory] = useState(EQUIPMENT_CATEGORIES[0]);
  const [items, setItems] = useState<EquipmentItem[]>([]);
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (target: EquipmentCategory) => {
    setLoading(true); setError(null);
    try { setItems(await fetchEquipment(target, accessToken)); }
    catch (cause) { setItems([]); setError(cause instanceof Error ? cause.message : '목록을 불러오지 못했습니다.'); }
    finally { setLoading(false); }
  }, [accessToken]);

  const loadSearch = useCallback(async (query: string) => {
    setLoading(true); setError(null);
    try { setItems(await searchEquipment(query, accessToken)); }
    catch (cause) { setItems([]); setError(cause instanceof Error ? cause.message : '검색 결과를 불러오지 못했습니다.'); }
    finally { setLoading(false); }
  }, [accessToken]);

  useEffect(() => {
    const query = keyword.trim();
    if (!query) {
      void load(category);
      return;
    }

    const timer = setTimeout(() => void loadSearch(query), 300);
    return () => clearTimeout(timer);
  }, [keyword, category, load, loadSearch]);

  const searching = keyword.trim().length > 0;
  const openDetail = (item: EquipmentItem) => {
    const categoryKey = searching
      ? SEARCH_TYPE_TO_CATEGORY[(item as EquipmentSearchItem).type]
      : category.key;
    if (categoryKey) navigation.navigate('EquipmentDetail', { categoryKey, itemId: item.id });
  };

  return <SafeAreaView style={styles.screen}>
    <StatusBar style="light" />
    <View style={styles.header}><Text style={styles.brand}>NOVFORGE</Text><Text style={styles.title}>PC 부품</Text></View>
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        value={keyword}
        onChangeText={setKeyword}
        placeholder="장비명 또는 제조사 검색"
        placeholderTextColor="#7d8590"
        returnKeyType="search"
        autoCorrect={false}
        clearButtonMode="while-editing"
      />
    </View>
    {!searching && <CategoryTabs selected={category} onSelect={setCategory} />}
    {loading ? <View style={styles.center}><ActivityIndicator size="large" color="#ffffff" /></View>
      : error ? <View style={styles.center}><Text style={styles.stateTitle}>{error}</Text><TouchableOpacity style={styles.retryButton} onPress={() => void (searching ? loadSearch(keyword.trim()) : load(category))}><Text style={styles.retryText}>다시 시도</Text></TouchableOpacity></View>
      : <FlatList style={styles.listView} data={items} keyExtractor={(item) => searching ? `${(item as EquipmentSearchItem).type}-${item.id}` : String(item.id)} contentContainerStyle={styles.list}
          ListEmptyComponent={<View style={styles.center}><Text style={styles.stateTitle}>{searching ? '검색 결과가 없습니다.' : '등록된 부품이 없습니다.'}</Text><Text style={styles.stateBody}>{searching ? '다른 제품명이나 제조사로 검색해 보세요.' : '부품이 추가되면 여기에 표시됩니다.'}</Text></View>}
          renderItem={({ item }) => <EquipmentCard item={item} categoryLabel={searching ? (item as EquipmentSearchItem).type : category.label} onPress={() => openDetail(item)} />} />}
  </SafeAreaView>;
}
