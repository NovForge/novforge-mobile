import { API_BASE_URL, ApiError, AuthUser } from '../auth';
import type { ImagePickerAsset } from 'expo-image-picker';

const patchUser = async (path: string, body: Record<string, string>, accessToken: string): Promise<AuthUser> => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    let message = response.status === 401 ? '로그인이 만료되었습니다. 다시 로그인해 주세요.' : '사용자 정보를 수정하지 못했습니다.';
    try {
      const error = await response.json();
      message = error.detail || error.message || message;
    } catch {}
    throw new ApiError(response.status, message);
  }
  return response.json() as Promise<AuthUser>;
};

export const updateMyNickname = (userNickname: string, accessToken: string) =>
  patchUser('/api/users/me', { userNickname }, accessToken);

export const withdrawMe = async (accessToken: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/api/users/me`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!response.ok) {
    let message = response.status === 401
      ? '로그인이 만료되었습니다. 다시 로그인해 주세요.'
      : '회원탈퇴를 완료하지 못했습니다.';
    try {
      const error = await response.json();
      message = error.detail || error.message || message;
    } catch {}
    throw new ApiError(response.status, message);
  }
};

export const uploadMyProfileImage = async (asset: ImagePickerAsset, accessToken: string): Promise<AuthUser> => {
  const formData = new FormData();
  if (asset.file) {
    formData.append('profileImage', asset.file, asset.fileName || 'profile-image.jpg');
  } else {
    formData.append('profileImage', {
      uri: asset.uri,
      name: asset.fileName || `profile-${Date.now()}.jpg`,
      type: asset.mimeType || 'image/jpeg',
    } as unknown as Blob);
  }
  const response = await fetch(`${API_BASE_URL}/api/users/profile-images`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${accessToken}` },
    body: formData,
  });
  if (!response.ok) {
    let message = response.status === 401 ? '로그인이 만료되었습니다. 다시 로그인해 주세요.' : `프로필 사진을 변경하지 못했습니다. (HTTP ${response.status})`;
    if (response.status === 413) message = '프로필 사진은 5MB 이하여야 합니다.';
    if (response.status === 415) message = 'JPEG, PNG 또는 WebP 이미지만 사용할 수 있습니다.';
    try {
      const raw = await response.text();
      if (raw) {
        try { const error = JSON.parse(raw); message = error.detail || error.message || message; }
        catch { message = `${message} ${raw.slice(0, 160)}`; }
      }
    } catch {}
    throw new ApiError(response.status, message);
  }
  return response.json() as Promise<AuthUser>;
};
