import { API_BASE_URL } from '../auth';

export type EquipmentCategory = { key: string; label: string; endpoint: string };
export type EquipmentItem = { id: number; manufacturer: string; name: string; price: number; description?: string | null; imageUrl?: string | null; [key: string]: unknown };
export type EquipmentField = { key: string; label: string; kind?: 'text' | 'number' | 'boolean' | 'multiline'; placeholder?: string; optional?: boolean };

export const resolveEquipmentImageUrl = (imageUrl?: string | null) => {
  if (!imageUrl) return null;
  if (/^https?:\/\//i.test(imageUrl)) return imageUrl;
  return `${API_BASE_URL}${imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`}`;
};

export const EQUIPMENT_CATEGORIES: EquipmentCategory[] = [
  { key: 'cpu', label: 'CPU', endpoint: '/api/cpus' },
  { key: 'gpu', label: 'GPU', endpoint: '/api/gpus' },
  { key: 'motherboard', label: '메인보드', endpoint: '/api/motherboards' },
  { key: 'memory', label: '메모리', endpoint: '/api/memorys' },
  { key: 'storage', label: '저장장치', endpoint: '/api/storages' },
  { key: 'power', label: '파워', endpoint: '/api/power-supplies' },
  { key: 'cooler', label: 'CPU 쿨러', endpoint: '/api/cpu-coolers' },
  { key: 'case', label: '케이스', endpoint: '/api/cases' },
];

const common: EquipmentField[] = [
  { key: 'manufacturer', label: '제조사', placeholder: '예: AMD' },
  { key: 'name', label: '제품명', placeholder: '제품의 전체 이름' },
  { key: 'price', label: '가격 (원)', kind: 'number', placeholder: '0' },
];
const tail: EquipmentField[] = [
  { key: 'description', label: '설명', kind: 'multiline', optional: true },
  { key: 'imageUrl', label: '이미지 URL', optional: true, placeholder: 'https://...' },
];
const f = (key: string, label: string, kind: EquipmentField['kind'] = 'text'): EquipmentField => ({ key, label, kind });

export const EQUIPMENT_FIELDS: Record<string, EquipmentField[]> = {
  cpu: [...common, f('socket', '소켓'), f('cores', '코어 수', 'number'), f('threads', '스레드 수', 'number'), f('baseClock', '기본 클럭 (GHz)', 'number'), f('boostClock', '부스트 클럭 (GHz)', 'number'), f('cache', '캐시'), f('tdp', 'TDP (W)', 'number'), f('integratedGraphics', '내장 그래픽', 'boolean'), f('memorySupport', '메모리 지원'), f('pcieVersion', 'PCIe 버전'), ...tail],
  gpu: [...common, f('memorySize', '메모리 용량 (GB)', 'number'), f('memoryType', '메모리 타입'), f('length', '길이 (mm)', 'number'), f('powerConsumption', '소비 전력 (W)', 'number'), f('recommendedPsu', '권장 파워 (W)', 'number'), ...tail],
  motherboard: [...common, f('socket', '소켓'), f('chipset', '칩셋'), f('formFactor', '폼팩터'), f('memorySupport', '메모리 지원'), f('memorySlots', '메모리 슬롯', 'number'), f('maxMemory', '최대 메모리 (GB)', 'number'), f('maxMemoryClock', '최대 메모리 클럭', 'number'), f('pcieVersion', 'PCIe 버전'), f('pcieX16Slots', 'PCIe x16 슬롯', 'number'), f('m2Slots', 'M.2 슬롯', 'number'), f('sataPorts', 'SATA 포트', 'number'), f('wifi', 'Wi-Fi', 'boolean'), f('bluetooth', 'Bluetooth', 'boolean'), ...tail],
  memory: [...common, f('type', '메모리 타입'), f('capacity', '총 용량 (GB)', 'number'), f('clock', '클럭 (MHz)', 'number'), f('moduleCount', '모듈 수', 'number'), f('moduleCapacity', '모듈당 용량 (GB)', 'number'), f('formFactor', '폼팩터'), f('casLatency', 'CAS 레이턴시', 'number'), f('voltage', '전압 (V)', 'number'), f('ecc', 'ECC', 'boolean'), ...tail],
  storage: [...common, f('type', '저장장치 타입'), f('interfaceType', '인터페이스'), f('capacity', '용량 (GB)', 'number'), f('readSpeed', '읽기 속도 (MB/s)', 'number'), f('formFactor', '폼팩터'), f('cacheSize', '캐시 (MB)', 'number'), ...tail],
  power: [...common, f('wattage', '정격 출력 (W)', 'number'), f('efficiency', '효율 등급'), f('modularType', '모듈러 타입'), f('formFactor', '폼팩터'), ...tail],
  cooler: [...common, f('type', '쿨러 타입'), f('socket', '지원 소켓'), f('fanSize', '팬 크기 (mm)', 'number'), f('radiatorSize', '라디에이터 크기 (mm)', 'number'), f('height', '높이 (mm)', 'number'), f('airflow', '풍량 (CFM)', 'number'), f('noiseLevel', '소음 (dBA)', 'number'), f('rgb', 'RGB', 'boolean'), ...tail],
  case: [...common, f('type', '케이스 타입'), f('supportedFormFactor', '지원 폼팩터'), f('maxGpuLength', '최대 GPU 길이 (mm)', 'number'), f('maxCpuCoolerHeight', '최대 CPU 쿨러 높이 (mm)', 'number'), f('supportedRadiatorSize', '지원 라디에이터'), f('fanCount', '기본 팬 수', 'number'), ...tail],
};

const errorMessage = async (response: Response) => {
  if (response.status === 401) return '로그인이 만료되었습니다. 다시 로그인해 주세요.';
  if (response.status === 403) return '관리자 권한이 필요합니다.';
  if (response.status === 404) return '장비를 찾을 수 없습니다.';
  try { const data = await response.json(); return data.detail || data.message || '요청을 처리하지 못했습니다.'; }
  catch { return '요청을 처리하지 못했습니다.'; }
};

export const fetchEquipment = async (category: EquipmentCategory, accessToken?: string) => {
  const response = await fetch(`${API_BASE_URL}${category.endpoint}`, { headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined });
  if (!response.ok) throw new Error(await errorMessage(response));
  const data: unknown = await response.json();
  return Array.isArray(data) ? data as EquipmentItem[] : [];
};

export const fetchEquipmentDetail = async (categoryKey: string, itemId: number, accessToken?: string) => {
  const category = EQUIPMENT_CATEGORIES.find((item) => item.key === categoryKey);
  if (!category) throw new Error('지원하지 않는 장비 카테고리입니다.');
  const response = await fetch(`${API_BASE_URL}${category.endpoint}/${itemId}`, { headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined });
  if (!response.ok) throw new Error(await errorMessage(response));
  return response.json() as Promise<EquipmentItem>;
};

const adminRequest = async (category: EquipmentCategory, accessToken: string, method: 'POST' | 'PATCH' | 'DELETE', body?: Record<string, unknown>, id?: number) => {
  const response = await fetch(`${API_BASE_URL}${category.endpoint}${id ? `/${id}` : ''}`, {
    method,
    headers: { Authorization: `Bearer ${accessToken}`, ...(body ? { 'Content-Type': 'application/json' } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!response.ok) throw new Error(await errorMessage(response));
  return response.status === 204 ? null : response.json();
};

export const createEquipment = (category: EquipmentCategory, values: Record<string, unknown>, token: string) => adminRequest(category, token, 'POST', values) as Promise<EquipmentItem>;
export const updateEquipment = (category: EquipmentCategory, id: number, values: Record<string, unknown>, token: string) => adminRequest(category, token, 'PATCH', values, id) as Promise<EquipmentItem>;
export const deleteEquipment = (category: EquipmentCategory, id: number, token: string) => adminRequest(category, token, 'DELETE', undefined, id);
