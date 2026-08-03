# Auth 컴포넌트

Google 회원가입·로그인 화면에서 사용하는 표현 컴포넌트를 관리합니다.

이 디렉터리의 컴포넌트는 화면 렌더링과 사용자 입력 전달만 담당합니다. Google OAuth 처리, 백엔드 API 호출, 세션 저장과 같은 인증 로직은 포함하지 않습니다.

## 파일 구성

| 파일 | 역할 |
| --- | --- |
| `AuthCard.tsx` | 로그인, 회원가입, 닉네임 입력, 게스트 진입 UI |
| `AuthCard.styles.ts` | `AuthCard` 전용 스타일 |
| `index.ts` | Auth 컴포넌트 공개 진입점 |

## AuthCard

`AuthCard`는 현재 인증 단계에 맞는 UI를 렌더링하고, 사용자 동작을 콜백으로 상위 화면에 전달하는 제어 컴포넌트입니다.

### Props

| Prop | 타입 | 설명 |
| --- | --- | --- |
| `onLogin` | `() => void` | Google 로그인 버튼 클릭 시 호출 |
| `onStartSignup` | `() => void` | Google 회원가입 버튼 클릭 시 호출 |
| `onCompleteSignup` | `() => void` | 닉네임 입력 후 회원가입 완료 버튼 클릭 시 호출 |
| `onGuestPress` | `() => void` | 게스트 진입 버튼 클릭 시 호출 |
| `onNicknameChange` | `(value: string) => void` | 닉네임 입력값 변경 시 호출 |
| `nickname` | `string` | 현재 닉네임 입력값 |
| `signupStep` | `boolean` | `true`이면 닉네임 입력 및 회원가입 완료 UI 표시 |
| `isLoading` | `boolean` | 처리 중 로딩 표시 및 버튼 비활성화 |
| `googleEnabled` | `boolean` | Google 인증 준비 여부에 따라 인증 버튼 활성화 |
| `error` | `string \| null` | 사용자에게 표시할 인증 오류 메시지 |

### 사용 예시

```tsx
import { AuthCard } from '../../components/auth';

<AuthCard
  onLogin={handleLogin}
  onStartSignup={handleStartSignup}
  onCompleteSignup={handleCompleteSignup}
  onGuestPress={handleGuest}
  onNicknameChange={setNickname}
  nickname={nickname}
  signupStep={signupStep}
  isLoading={isLoading}
  googleEnabled={googleEnabled}
  error={error}
/>
```

## 인증 흐름

실제 흐름은 `screens/auth/AuthScreen.tsx`에서 제어합니다.

### 로그인

```text
Google로 로그인
→ Google ID Token 발급
→ POST /api/auth/google
→ Google UID로 가입 사용자 조회
→ Novforge Access Token 저장
```

### 회원가입

```text
Google로 회원가입
→ Google ID Token 발급
→ 닉네임 입력
→ POST /api/users
→ Google UID와 사용자 정보 저장
→ POST /api/auth/google
→ 로그인 세션 저장
```

## 책임 분리

| 위치 | 책임 |
| --- | --- |
| `components/auth` | 인증 UI와 사용자 이벤트 전달 |
| `screens/auth` | OAuth 응답과 로그인·회원가입 단계 제어 |
| `services/auth/api.ts` | 백엔드 인증 API 및 인증 타입 |
| `services/auth/session.ts` | Access Token 세션 저장·복원·삭제 |

`AuthCard` 안에서 직접 API를 호출하거나 세션을 저장하지 않습니다. 인증 방식이나 백엔드 구현이 변경되더라도 UI 컴포넌트가 독립적으로 유지되도록 이 경계를 지킵니다.

## AuthScreen 상세

`screens/auth/AuthScreen.tsx`는 Auth 기능의 컨테이너 화면입니다. Google OAuth 요청을 생성하고 응답에 따라 로그인 또는 회원가입 흐름을 진행합니다.

### Props

| Prop | 타입 | 설명 |
| --- | --- | --- |
| `onAuthenticated` | `(session: AuthSession) => void` | 로그인 완료 후 저장된 세션을 상위 앱에 전달 |
| `onGuest` | `() => void` | 인증 없이 게스트 모드로 전환 |

### 내부 상태

| 상태 | 타입 | 설명 |
| --- | --- | --- |
| `intent` | `'login' \| 'signup' \| null` | 현재 Google 인증 요청의 목적 |
| `isLoading` | `boolean` | OAuth 또는 백엔드 요청 진행 여부 |
| `error` | `string \| null` | 화면에 표시할 오류 메시지 |
| `signupIdToken` | `string \| null` | 회원가입 단계에서 임시로 유지하는 Google ID Token |
| `nickname` | `string` | 회원가입에 사용할 닉네임 |

### 주요 처리

| 처리 | 설명 |
| --- | --- |
| `startGoogle()` | 플랫폼별 Client ID를 확인하고 Google 인증 창을 실행 |
| OAuth 응답 `useEffect` | 성공·오류·취소 결과를 구분하고 로그인 또는 닉네임 입력 단계로 이동 |
| `login()` | Google ID Token을 백엔드에 전달하고 Novforge 세션을 저장 |
| `completeSignup()` | 닉네임과 Google ID Token으로 가입한 뒤 자동 로그인 |

Google 인증 범위는 `openid`, `profile`, `email`입니다. 계정 선택 화면을 항상 표시하며, 웹에서는 설정된 Redirect URI를, 네이티브에서는 `novforge://oauthredirect` 형식의 URI를 사용합니다.

## 인증 API 상세

`services/auth/api.ts`는 인증 API 요청과 공통 인증 타입을 제공합니다.

### 공개 함수

| 함수 | 요청 | 반환값 | 설명 |
| --- | --- | --- | --- |
| `loginWithGoogle(idToken)` | `POST /api/auth/google` | `Promise<AuthSession>` | Google UID로 등록 사용자를 조회하고 Novforge Access Token 발급 |
| `signupWithGoogle(idToken, userNickname)` | `POST /api/users` | `Promise<AuthUser>` | Google 사용자 정보와 닉네임을 DB에 저장 |

### 요청 Body

```json
// POST /api/auth/google
{
  "idToken": "google-id-token"
}
```

```json
// POST /api/users
{
  "idToken": "google-id-token",
  "userNickname": "novforge-user"
}
```

### 주요 타입

```ts
type AuthUser = {
  userId: number;
  userName: string;
  userNickname: string;
  userEmail: string;
  profileImage: string | null;
};

type AuthSession = {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  user: AuthUser;
};
```

성공하지 않은 HTTP 응답은 상태 코드와 서버 메시지를 포함한 `ApiError`로 변환합니다. 서버가 JSON 오류 메시지를 제공하지 않으면 기본 메시지를 사용합니다.

## 세션 관리 상세

`services/auth/session.ts`는 키 `novforge.auth.session`으로 로그인 세션을 관리합니다.

| 함수 | 설명 |
| --- | --- |
| `saveSession(session)` | 세션과 계산된 만료 시각을 저장 |
| `loadSession()` | 저장값을 복원하고 유효한 세션 또는 `null` 반환 |
| `clearSession()` | 저장된 인증 세션 삭제 |

저장 형식은 다음과 같습니다.

```ts
type StoredSession = {
  session: AuthSession;
  expiresAt: number;
};
```

- 웹: `window.localStorage`
- Android/iOS: Expo `SecureStore`
- 만료된 세션: 자동 삭제 후 `null` 반환
- 손상된 JSON 또는 Access Token 누락: 자동 삭제 후 `null` 반환

Google ID Token은 세션에 저장하지 않습니다. 백엔드가 발급한 Novforge Access Token과 사용자 정보만 저장합니다.

## App 연결

루트 `App.tsx`는 시작할 때 `loadSession()`을 호출합니다. 유효한 세션이 없으면 `AuthScreen`을 표시하고, 인증이 완료되면 전달받은 `AuthSession`으로 로그인 상태를 표시합니다. 로그아웃할 때는 `clearSession()`을 호출하며 게스트 상태도 함께 초기화합니다.

```text
앱 시작
├─ 유효한 세션 있음 → 로그인 완료 상태
├─ 유효한 세션 없음 → AuthScreen
└─ 게스트 선택 → 게스트 상태

로그아웃 또는 로그인 화면으로 이동
→ 저장 세션 삭제
→ 인증 상태 초기화
→ AuthScreen
```

## 오류 처리

| 상황 | 처리 |
| --- | --- |
| 플랫폼용 Google Client ID 누락 | 인증 창을 열지 않고 설정 오류 표시 |
| Google 인증 취소 | 로딩 상태 해제 |
| Google 인증 오류 | Google 오류 메시지 또는 기본 메시지 표시 |
| ID Token 누락 | 토큰 수신 실패 메시지 표시 |
| 미가입 계정으로 로그인 | 회원가입 안내 메시지 표시 |
| 닉네임 미입력 | 백엔드 요청 전 입력 안내 표시 |
| 백엔드 오류 | 서버가 반환한 오류 메시지 표시 |

## 관련 환경 변수

```env
EXPO_PUBLIC_API_BASE_URL=http://localhost:8080
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=your-web-client-id.apps.googleusercontent.com
EXPO_PUBLIC_GOOGLE_WEB_REDIRECT_URI=http://localhost:8081/oauthredirect
EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID=your-android-client-id.apps.googleusercontent.com
EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID=your-ios-client-id.apps.googleusercontent.com
```

Client Secret은 프론트엔드 코드나 `EXPO_PUBLIC_*` 환경 변수에 저장하지 않습니다.
