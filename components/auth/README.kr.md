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
| `services/auth.ts` | 백엔드 인증 API 및 인증 타입 |
| `services/session.ts` | Access Token 세션 저장·복원·삭제 |

`AuthCard` 안에서 직접 API를 호출하거나 세션을 저장하지 않습니다. 인증 방식이나 백엔드 구현이 변경되더라도 UI 컴포넌트가 독립적으로 유지되도록 이 경계를 지킵니다.

## 관련 환경 변수

```env
EXPO_PUBLIC_API_BASE_URL=http://localhost:8080
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=your-web-client-id.apps.googleusercontent.com
EXPO_PUBLIC_GOOGLE_WEB_REDIRECT_URI=http://localhost:8081/oauthredirect
EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID=your-android-client-id.apps.googleusercontent.com
EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID=your-ios-client-id.apps.googleusercontent.com
```

Client Secret은 프론트엔드 코드나 `EXPO_PUBLIC_*` 환경 변수에 저장하지 않습니다.
