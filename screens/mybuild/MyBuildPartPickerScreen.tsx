import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { EquipmentItem, EQUIPMENT_CATEGORIES, fetchEquipment } from '../../services/equipment';
import { fetchMyBuild, updateMyBuild } from '../../services/mybuild';
import { RootStackParamList } from '../../router/routes';
import { styles } from './MyBuildPartPickerScreen.styles';
type Props = NativeStackScreenProps<RootStackParamList, 'MyBuildPartPicker'> & { accessToken: string };
const fieldMap: Record<string, string> = { cpu: 'cpuId', gpu: 'gpuId', motherboard: 'motherboardId', power: 'powerId', cooler: 'cpuCoolerId', case: 'caseId' };
export default function MyBuildPartPickerScreen({ route, navigation, accessToken }: Props) {
  const category = EQUIPMENT_CATEGORIES.find((value) => value.key === route.params.categoryKey);
  const [items, setItems] = useState<EquipmentItem[]>([]); const [loading, setLoading] = useState(true); const [savingId, setSavingId] = useState<number | null>(null);
  const load = useCallback(async () => { if (!category) return; setLoading(true); try { setItems(await fetchEquipment(category, accessToken)); } catch (e) { Alert.alert('조회 실패', e instanceof Error ? e.message : '부품을 불러오지 못했습니다.'); } finally { setLoading(false); } }, [accessToken, category]);
  useEffect(() => { navigation.setOptions({ title: `${category?.label || '부품'} 선택` }); void load(); }, [category?.label, load, navigation]);
  const select = async (item: EquipmentItem) => { setSavingId(item.id); try {
    if (category?.key === 'memory' || category?.key === 'storage') { const build = await fetchMyBuild(route.params.buildId, accessToken); const current = category.key === 'memory' ? build.memories : build.storages; const exists = current.some((part) => part.id === item.id); const next = exists ? current.map((part) => ({ id: part.id, quantity: part.id === item.id ? part.quantity + 1 : part.quantity })) : [...current.map((part) => ({ id: part.id, quantity: part.quantity })), { id: item.id, quantity: 1 }]; await updateMyBuild(build.buildId, category.key === 'memory' ? { memories: next } : { storages: next }, accessToken); }
    else { const field = fieldMap[category?.key || '']; if (!field) throw new Error('지원하지 않는 부품입니다.'); await updateMyBuild(route.params.buildId, { [field]: item.id }, accessToken); }
    navigation.goBack();
  } catch (e) { Alert.alert('추가 실패', e instanceof Error ? e.message : '부품을 추가하지 못했습니다.'); } finally { setSavingId(null); } };
  if (!category) return <SafeAreaView style={styles.screen}><View style={styles.center}><Text style={styles.error}>지원하지 않는 부품입니다.</Text></View></SafeAreaView>;
  return <SafeAreaView style={styles.screen}>{loading ? <View style={styles.center}><ActivityIndicator size="large" color="#8b5cf6" /></View> : <FlatList data={items} keyExtractor={(item) => String(item.id)} contentContainerStyle={styles.list} ListEmptyComponent={<View style={styles.center}><Text style={styles.error}>등록된 부품이 없습니다.</Text></View>} renderItem={({ item }) => <TouchableOpacity style={styles.item} onPress={() => void select(item)} disabled={savingId !== null}><View style={styles.itemBody}><Text style={styles.maker}>{item.manufacturer}</Text><Text style={styles.name}>{item.name}</Text><Text style={styles.price}>{Number(item.price).toLocaleString('ko-KR')}원</Text></View><Text style={styles.action}>{savingId === item.id ? '추가 중' : '선택'}</Text></TouchableOpacity>} />}</SafeAreaView>;
}
