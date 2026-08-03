# MyPage 컴포넌트

마이페이지에서 사용자 정보를 표시하고 닉네임·프로필 사진 수정과 로그아웃 동작을 연결하는 표현 컴포넌트를 관리합니다.

이 디렉터리는 UI 렌더링과 사용자 이벤트 전달만 담당합니다. 수정 요청, 입력 상태, 세션 갱신은 Screen과 Service에서 처리합니다.

## 파일 구성

| 파일 | 역할 |
| --- | --- |
| `MyPageCard.tsx` | 사용자 정보, 프로필 사진 변경, 내 정보 수정과 로그아웃 명령 표시 |
| `MyPageEditModal.tsx` | 이름·이메일 조회와 닉네임 수정 폼 표시 |
| `MyPageCard.styles.ts` | MyPage 컴포넌트 공통 스타일 |
| `index.ts` | MyPage 컴포넌트 공개 진입점 |

## MyPageCard

사용자 프로필을 카드로 표시합니다. 프로필 사진을 누르면 사진 변경 이벤트를, 내 정보 수정 버튼을 누르면 닉네임 편집 이벤트를 상위 Screen에 전달합니다.

| Prop | 타입 | 설명 |
| --- | --- | --- |
| `session` | `AuthSession \| null` | 현재 로그인 세션 |
| `onEdit` | `() => void` | 내 정보 수정 선택 시 호출 |
| `onProfileImagePress` | `() => void` | 프로필 사진 선택 시 호출 |
| `onExit` | `() => void` | 로그아웃 또는 로그인 화면 이동 시 호출 |

## MyPageEditModal

Google 이름과 이메일은 읽기 전용으로 표시하고 닉네임만 수정할 수 있게 합니다. 닉네임은 최대 50자까지 입력할 수 있습니다.

## 프로필 이미지 선택

`MyPageCard`의 프로필 사진을 누르면 Expo ImagePicker를 즉시 실행합니다. 웹에서는 파일 선택창, Android와 iOS에서는 시스템 사진 라이브러리를 표시합니다. 선택한 JPEG, PNG 또는 WebP 파일이 5MB 이하인지 확인한 뒤 업로드합니다.

## 관련 Screen

### MyPageScreen

`screens/mypage/MyPageScreen.tsx`는 모달 표시, 입력값, 로딩, 오류 상태와 사용자 정보 수정 흐름을 관리합니다.

```text
닉네임 수정 또는 프로필 사진 선택
→ 시스템 파일 선택창 또는 사진 라이브러리 표시
→ 사용자 수정 또는 이미지 파일 업로드 요청
→ 응답 사용자 정보로 현재 세션 갱신
→ 저장된 세션의 사용자 정보 갱신
→ 마이페이지 즉시 다시 렌더링
```

## 책임 분리

| 위치 | 책임 |
| --- | --- |
| `components/mypage` | 프로필 카드와 수정 모달 UI |
| `screens/mypage` | 입력·오류·저장 상태와 수정 흐름 |
| `services/users` | 닉네임 수정과 프로필 이미지 파일 업로드 요청 |
| `services/auth` | 현재 세션과 저장된 세션 갱신 |
| `router` | 마이페이지 탭과 세션 변경 콜백 연결 |
