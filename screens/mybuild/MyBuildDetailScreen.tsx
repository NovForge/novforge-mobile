import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, SafeAreaView, ScrollView, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { deleteMyBuild, fetchMyBuild, MyBuild, removeMyBuildPart, updateMyBuild } from '../../services/mybuild';
import { RootStackParamList } from '../../router/routes';
import { styles } from './MyBuildDetailScreen.styles';

type Props = NativeStackScreenProps<RootStackParamList, 'MyBuildDetail'> & { accessToken: string };
const singles = [
  ['cpu', 'CPU', 'cpu'], ['gpu', '그래픽카드', 'gpu'], ['motherboard', '메인보드', 'motherboard'],
  ['memory', '메모리', 'memories'], ['storage', '저장장치', 'storages'], ['power', '파워', 'powerSupply'],
  ['cooler', 'CPU 쿨러', 'cpuCooler'], ['case', '케이스', 'pcCase'],
] as const;

export default function MyBuildDetailScreen({ route, navigation, accessToken }: Props) {
  const [build, setBuild] = useState<MyBuild | null>(null); const [name, setName] = useState(''); const [loading, setLoading] = useState(true); const [saving, setSaving] = useState(false);
  const load = useCallback(async () => { setLoading(true); try { const value = await fetchMyBuild(route.params.buildId, accessToken); setBuild(value); setName(value.buildName); } catch (e) { Alert.alert('조회 실패', e instanceof Error ? e.message : '견적을 찾지 못했습니다.', [{ text: '확인', onPress: () => navigation.goBack() }]); } finally { setLoading(false); } }, [accessToken, navigation, route.params.buildId]);
  useFocusEffect(useCallback(() => { void load(); }, [load]));
  useEffect(() => navigation.setOptions({ title: build?.buildName || '견적 상세' }), [build?.buildName, navigation]);
  const saveInfo = async (publicBuild = build?.publicBuild) => { if (!build || !name.trim()) return; setSaving(true); try { setBuild(await updateMyBuild(build.buildId, { buildName: name.trim(), publicBuild }, accessToken)); } catch (e) { Alert.alert('수정 실패', e instanceof Error ? e.message : '수정하지 못했습니다.'); } finally { setSaving(false); } };
  const remove = (type: string, label: string) => Alert.alert(`${label} 제거`, '이 부품을 견적에서 제거할까요?', [{ text: '취소' }, { text: '제거', style: 'destructive', onPress: async () => { try { setBuild(await removeMyBuildPart(route.params.buildId, type, accessToken)); } catch (e) { Alert.alert('제거 실패', e instanceof Error ? e.message : '제거하지 못했습니다.'); } } }]);
  const removeMultiple = async (kind: 'memories' | 'storages', id: number) => {
    const current = build?.[kind] || []; const target = current.find((part) => part.id === id);
    if (!build || !target) return;
    const next = target.quantity > 1 ? current.map((part) => ({ id: part.id, quantity: part.id === id ? part.quantity - 1 : part.quantity })) : current.filter((part) => part.id !== id).map((part) => ({ id: part.id, quantity: part.quantity }));
    try { setBuild(await updateMyBuild(build.buildId, { [kind]: next }, accessToken)); } catch (e) { Alert.alert('수정 실패', e instanceof Error ? e.message : '수량을 수정하지 못했습니다.'); }
  };
  const destroy = () => Alert.alert('견적 삭제', '삭제한 견적은 복구할 수 없습니다.', [{ text: '취소' }, { text: '삭제', style: 'destructive', onPress: async () => { try { await deleteMyBuild(route.params.buildId, accessToken); navigation.popTo('MainTabs'); } catch (e) { Alert.alert('삭제 실패', e instanceof Error ? e.message : '삭제하지 못했습니다.'); } } }]);
  if (loading || !build) return <SafeAreaView style={styles.screen}><View style={styles.center}><ActivityIndicator size="large" color="#ffffff" /></View></SafeAreaView>;
  return <SafeAreaView style={styles.screen}><ScrollView contentContainerStyle={styles.content}>
    <View style={styles.priceCard}><Text style={styles.priceLabel}>총 견적 금액</Text><Text style={styles.price}>{build.totalPrice.toLocaleString('ko-KR')}원</Text></View>
    <Text style={styles.sectionTitle}>기본 정보</Text><View style={styles.panel}><TextInput style={styles.input} value={name} onChangeText={setName} maxLength={100} /><View style={styles.publicRow}><Text style={styles.rowTitle}>견적 공개</Text><Switch value={build.publicBuild} onValueChange={(value) => { setBuild({ ...build, publicBuild: value }); void saveInfo(value); }} trackColor={{ false: '#404040', true: '#ffffff' }} thumbColor={build.publicBuild ? '#000000' : '#d4d4d4'} /></View><TouchableOpacity style={styles.saveButton} onPress={() => void saveInfo()} disabled={saving}><Text style={styles.saveText}>{saving ? '저장 중...' : '이름 저장'}</Text></TouchableOpacity></View>
    <Text style={styles.sectionTitle}>부품 구성</Text>{singles.map(([category, label, key]) => {
      const value = build[key]; const parts = Array.isArray(value) ? value : value ? [value] : [];
      return <View style={styles.partCard} key={category}><View style={styles.partTop}><Text style={styles.partLabel}>{label}</Text><TouchableOpacity onPress={() => navigation.navigate('MyBuildPartPicker', { buildId: build.buildId, categoryKey: category })}><Text style={styles.changeText}>{Array.isArray(value) ? '추가' : parts.length ? '변경' : '추가'}</Text></TouchableOpacity></View>{parts.length ? parts.map((part) => <View key={part.id} style={styles.partLine}><View style={styles.partInfo}><Text style={styles.partName}>{part.name}</Text><Text style={styles.partPrice}>{part.price.toLocaleString('ko-KR')}원{'quantity' in part ? ` × ${part.quantity}` : ''}</Text></View><TouchableOpacity onPress={() => Array.isArray(value) ? void removeMultiple(key as 'memories' | 'storages', part.id) : remove(category === 'power' ? 'power-supply' : category === 'cooler' ? 'cpu-cooler' : category, label)}><Text style={styles.removeText}>{Array.isArray(value) && 'quantity' in part && Number(part.quantity) > 1 ? '−1' : '제거'}</Text></TouchableOpacity></View>) : <Text style={styles.emptyPart}>선택된 부품이 없습니다.</Text>}</View>;
    })}
    <TouchableOpacity style={styles.deleteButton} onPress={destroy}><Text style={styles.deleteText}>견적 삭제</Text></TouchableOpacity>
  </ScrollView></SafeAreaView>;
}
