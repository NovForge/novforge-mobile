import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { EquipmentItem, EQUIPMENT_CATEGORIES, fetchEquipmentDetail, resolveEquipmentImageUrl } from '../../services/equipment';
import { RootStackParamList } from '../../router/routes';
import { styles } from './EquipmentDetailScreen.styles';
import { AddEquipmentToBuildModal } from '../../components/equipment';

type Props = NativeStackScreenProps<RootStackParamList, 'EquipmentDetail'> & { accessToken?: string };
const BASE_KEYS = new Set(['id', 'manufacturer', 'name', 'price', 'description', 'imageUrl', 'createdAt', 'updatedAt']);
const LABELS: Record<string, string> = { socket: '소켓', cores: '코어', threads: '스레드', baseClock: '기본 클럭', boostClock: '부스트 클럭', cache: '캐시', tdp: 'TDP', integratedGraphics: '내장 그래픽', memorySupport: '메모리 지원', pcieVersion: 'PCIe 버전', memorySize: '메모리 용량', memoryType: '메모리 타입', length: '길이', powerConsumption: '소비 전력', recommendedPsu: '권장 파워', chipset: '칩셋', formFactor: '폼팩터', memorySlots: '메모리 슬롯', maxMemory: '최대 메모리', maxMemoryClock: '최대 메모리 클럭', pcieX16Slots: 'PCIe x16 슬롯', m2Slots: 'M.2 슬롯', sataPorts: 'SATA 포트', wifi: 'Wi-Fi', bluetooth: 'Bluetooth', type: '타입', capacity: '용량', clock: '클럭', moduleCount: '모듈 수', moduleCapacity: '모듈 용량', casLatency: 'CAS Latency', voltage: '전압', ecc: 'ECC', interfaceType: '인터페이스', readSpeed: '읽기 속도', cacheSize: '캐시 용량', wattage: '출력', efficiency: '효율 등급', modularType: '모듈러 방식', fanSize: '팬 크기', radiatorSize: '라디에이터 크기', height: '높이', airflow: '풍량', noiseLevel: '소음', rgb: 'RGB', supportedFormFactor: '지원 폼팩터', maxGpuLength: '최대 GPU 길이', maxCpuCoolerHeight: '최대 CPU 쿨러 높이', supportedRadiatorSize: '지원 라디에이터', fanCount: '팬 수' };

export default function EquipmentDetailScreen({ route, accessToken }: Props) {
  const [item, setItem] = useState<EquipmentItem | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [buildModalVisible, setBuildModalVisible] = useState(false);
  const category = EQUIPMENT_CATEGORIES.find((entry) => entry.key === route.params.categoryKey);
  useEffect(() => { fetchEquipmentDetail(route.params.categoryKey, route.params.itemId, accessToken).then(setItem).catch((cause) => setError(cause instanceof Error ? cause.message : '상세 정보를 불러오지 못했습니다.')); }, [route.params.categoryKey, route.params.itemId, accessToken]);
  if (error) return <SafeAreaView style={styles.center}><Text style={styles.error}>{error}</Text></SafeAreaView>;
  if (!item) return <SafeAreaView style={styles.center}><ActivityIndicator size="large" color="#ffffff" /></SafeAreaView>;
  const imageUrl = resolveEquipmentImageUrl(item.imageUrl);
  const specs = Object.entries(item).filter(([key, value]) => !BASE_KEYS.has(key) && value !== null && value !== undefined);
  return <SafeAreaView style={styles.screen}><ScrollView>
    {imageUrl ? <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" /> : <View style={styles.imageFallback}><Text style={styles.imageFallbackText}>{category?.label || 'PC'}</Text></View>}
    <View style={styles.body}><Text style={styles.manufacturer}>{item.manufacturer}</Text><Text style={styles.name}>{item.name}</Text><Text style={styles.price}>{Number(item.price || 0).toLocaleString('ko-KR')}원</Text>
      {accessToken ? <TouchableOpacity style={styles.addToBuildButton} onPress={() => setBuildModalVisible(true)}><Text style={styles.addToBuildText}>내 견적에 추가 또는 교체</Text></TouchableOpacity> : null}
      {item.description ? <Text style={styles.description}>{item.description}</Text> : null}
      {specs.length > 0 && <><Text style={styles.specTitle}>상세 사양</Text>{specs.map(([key, value]) => <View key={key} style={styles.specRow}><Text style={styles.specLabel}>{LABELS[key] || key}</Text><Text style={styles.specValue}>{typeof value === 'boolean' ? (value ? '지원' : '미지원') : String(value)}</Text></View>)}</>}
    </View>
  </ScrollView>{accessToken ? <AddEquipmentToBuildModal visible={buildModalVisible} item={item} categoryKey={route.params.categoryKey} accessToken={accessToken} onClose={() => setBuildModalVisible(false)} /> : null}</SafeAreaView>;
}
