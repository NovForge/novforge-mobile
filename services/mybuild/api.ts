import { API_BASE_URL } from '../auth';

export type BuildPart = { id: number; name: string; price: number };
export type BuildPartWithQuantity = BuildPart & { quantity: number };

export type MyBuild = {
  buildId: number;
  userId: number;
  buildName: string;
  totalPrice: number;
  publicBuild: boolean;
  motherboard: BuildPart | null;
  gpu: BuildPart | null;
  cpu: BuildPart | null;
  powerSupply: BuildPart | null;
  cpuCooler: BuildPart | null;
  pcCase: BuildPart | null;
  memories: BuildPartWithQuantity[];
  storages: BuildPartWithQuantity[];
  createdAt: string;
  updatedAt: string | null;
};

export type MyBuildWriteRequest = Partial<{
  buildName: string; publicBuild: boolean; motherboardId: number; gpuId: number; cpuId: number;
  powerId: number; cpuCoolerId: number; caseId: number;
  memories: { id: number; quantity: number }[]; storages: { id: number; quantity: number }[];
}>;

async function request<T>(path: string, accessToken: string, method = 'GET', body?: unknown): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: { ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}), ...(body === undefined ? {} : { 'Content-Type': 'application/json' }) },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  if (!response.ok) {
    let message = response.status === 401 ? '로그인이 만료되었습니다. 다시 로그인해 주세요.' : '요청을 처리하지 못했습니다.';
    try { const error = await response.json(); message = error.detail || error.message || message; } catch {}
    throw new Error(message);
  }
  return (response.status === 204 ? undefined : await response.json()) as T;
}

export async function fetchMyBuilds(accessToken: string): Promise<MyBuild[]> {
  const response = await fetch(`${API_BASE_URL}/api/my-builds/me`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!response.ok) {
    if (response.status === 401) throw new Error('로그인이 만료되었습니다. 다시 로그인해 주세요.');
    throw new Error('내 견적을 불러오지 못했습니다.');
  }
  const data: unknown = await response.json();
  return Array.isArray(data) ? data as MyBuild[] : [];
}

export async function fetchPublicBuilds(): Promise<MyBuild[]> {
  const response = await fetch(`${API_BASE_URL}/api/my-builds`);
  if (!response.ok) throw new Error('공개 견적을 불러오지 못했습니다.');
  const data: unknown = await response.json();
  return Array.isArray(data) ? data as MyBuild[] : [];
}

export const fetchPublicBuild = (buildId: number) =>
  request<MyBuild>(`/api/my-builds/${buildId}`, '');

export const fetchMyBuild = (buildId: number, token: string) => request<MyBuild>(`/api/my-builds/me/${buildId}`, token);
export const createMyBuild = (body: MyBuildWriteRequest & { buildName: string }, token: string) => request<MyBuild>('/api/my-builds/me', token, 'POST', body);
export const updateMyBuild = (buildId: number, body: MyBuildWriteRequest, token: string) => request<MyBuild>(`/api/my-builds/me/${buildId}`, token, 'PATCH', body);
export const removeMyBuildPart = (buildId: number, partType: string, token: string) => request<MyBuild>(`/api/my-builds/me/${buildId}/parts/${partType}`, token, 'DELETE');
export const deleteMyBuild = (buildId: number, token: string) => request<void>(`/api/my-builds/me/${buildId}`, token, 'DELETE');
