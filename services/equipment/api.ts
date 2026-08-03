import { API_BASE_URL } from '../auth';

export type EquipmentCategory = { key: string; label: string; endpoint: string };
export type EquipmentItem = {
  id: number;
  manufacturer: string;
  name: string;
  price: number;
  description?: string | null;
  imageUrl?: string | null;
  [key: string]: unknown;
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

export const fetchEquipment = async (category: EquipmentCategory, accessToken?: string) => {
  const response = await fetch(`${API_BASE_URL}${category.endpoint}`, {
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
  });
  if (!response.ok) {
    if (response.status === 401) throw new Error('부품 목록을 보려면 로그인이 필요합니다.');
    throw new Error('부품 목록을 불러오지 못했습니다.');
  }
  const data: unknown = await response.json();
  return Array.isArray(data) ? data as EquipmentItem[] : [];
};

export const fetchEquipmentDetail = async (categoryKey: string, itemId: number, accessToken?: string) => {
  const category = EQUIPMENT_CATEGORIES.find((item) => item.key === categoryKey);
  if (!category) throw new Error('지원하지 않는 부품 카테고리입니다.');
  const response = await fetch(`${API_BASE_URL}${category.endpoint}/${itemId}`, {
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
  });
  if (!response.ok) {
    if (response.status === 401) throw new Error('상세 정보를 보려면 로그인이 필요합니다.');
    if (response.status === 404) throw new Error('부품 정보를 찾을 수 없습니다.');
    throw new Error('부품 상세 정보를 불러오지 못했습니다.');
  }
  return response.json() as Promise<EquipmentItem>;
};
