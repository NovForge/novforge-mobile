import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { CategoryTabs, EquipmentCard } from '../../components/equipment';
import { EQUIPMENT_CATEGORIES, EquipmentCategory, EquipmentItem, fetchEquipment } from '../../services/equipment';
import { RootStackParamList } from '../../router/routes';
import { styles } from './EquipmentListScreen.styles';

type Props = { accessToken?: string };

export default function EquipmentListScreen({ accessToken }: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [category, setCategory] = useState(EQUIPMENT_CATEGORIES[0]);
  const [items, setItems] = useState<EquipmentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (target: EquipmentCategory) => {
    setLoading(true); setError(null);
    try { setItems(await fetchEquipment(target, accessToken)); }
    catch (cause) { setItems([]); setError(cause instanceof Error ? cause.message : '목록을 불러오지 못했습니다.'); }
    finally { setLoading(false); }
  }, [accessToken]);

  useEffect(() => { void load(category); }, [category, load]);

  return <SafeAreaView style={styles.screen}>
    <StatusBar style="light" />
    <View style={styles.header}><Text style={styles.brand}>NOVFORGE</Text><Text style={styles.title}>PC 부품</Text></View>
    <CategoryTabs selected={category} onSelect={setCategory} />
    {loading ? <View style={styles.center}><ActivityIndicator size="large" color="#8b5cf6" /></View>
      : error ? <View style={styles.center}><Text style={styles.stateTitle}>{error}</Text><TouchableOpacity style={styles.retryButton} onPress={() => void load(category)}><Text style={styles.retryText}>다시 시도</Text></TouchableOpacity></View>
      : <FlatList data={items} keyExtractor={(item) => String(item.id)} contentContainerStyle={styles.list}
          ListEmptyComponent={<View style={styles.center}><Text style={styles.stateTitle}>등록된 부품이 없습니다.</Text><Text style={styles.stateBody}>부품이 추가되면 여기에 표시됩니다.</Text></View>}
          renderItem={({ item }) => <EquipmentCard item={item} categoryLabel={category.label} onPress={() => navigation.navigate('EquipmentDetail', { categoryKey: category.key, itemId: item.id })} />} />}
  </SafeAreaView>;
}
