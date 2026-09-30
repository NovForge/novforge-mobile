export type AuthUser = {
  userId: number;
  userName: string;
  userNickname: string;
  userEmail: string;
  profileImage: string | null;
};

export type AuthSession = {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  isAdmin: boolean;
  user: AuthUser;
};

export class ApiError extends Error {
  constructor(public readonly status: number, message: string) {
    super(message);
  }
}

export const API_BASE_URL = (process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:8080').replace(/\/$/, '');

const request = async <T>(path: string, body: unknown): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    let message = '요청을 처리하지 못했습니다.';
    try {
      const error = await response.json();
      message = error.detail || error.message || message;
    } catch {}
    throw new ApiError(response.status, message);
  }
  return response.json() as Promise<T>;
};

export const loginWithGoogle = (idToken: string) => request<AuthSession>('/api/auth/google', { idToken });
export const signupWithGoogle = (idToken: string, userNickname: string) => request<AuthUser>('/api/users', { idToken, userNickname });
