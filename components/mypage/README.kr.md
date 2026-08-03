# MyPage 컴포넌트

마이페이지 화면에서 사용자 정보를 표시하고 로그아웃 동작을 연결하는 표현 컴포넌트를 관리합니다.

이 디렉터리는 UI 렌더링과 사용자 이벤트 전달만 담당합니다. 인증 상태 확인, 세션 정보 처리, 화면 전환은 각각 Service, Screen, Router에서 처리합니다.

## 파일 구성

| 파일 | 역할 |
| --- | --- |
| `MyPageCard.tsx` | 사용자 아바타, 닉네임, 이메일, 로그아웃 버튼 표시 |
| `MyPageCard.styles.ts` | MyPage 카드 UI 스타일 |
| `index.ts` | MyPage 컴포넌트 공개 진입점 |

## MyPageCard

마이페이지 상단 영역에 사용자 정보를 카드 형태로 렌더링합니다. 세션이 있으면 프로필 이미지가 있으면 표시하고, 없으면 닉네임 첫 글자를 아바타 대체 텍스트로 보여줍니다.

### Props

| Prop | 타입 | 설명 |
| --- | --- | --- |
| `session` | `AuthSession \| null` | 현재 로그인 세션 정보 |
| `onExit` | `() => void` | 로그아웃 또는 로그인 화면 이동 동작 |

### 사용 예시

```tsx
<MyPageCard session={session} onExit={onExit} />
```

## 관련 Screen

### MyPageScreen

`screens/mypage/MyPageScreen.tsx`는 마이페이지 화면입니다. `MyPageCard`를 감싸서 SafeAreaView 안에 배치합니다.

## 책임 분리

| 위치 | 책임 |
| --- | --- |
| `components/mypage` | 마이페이지 카드 UI 렌더링 |
| `screens/mypage` | 마이페이지 화면 상태와 레이아웃 구성 |
| `services/auth` | 세션 및 인증 관련 데이터 관리 |
| `router` | 마이페이지 탭 등록 |
