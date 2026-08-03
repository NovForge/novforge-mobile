# MyBuild 컴포넌트

로그인한 사용자의 PC 견적 생성, 조회, 수정, 삭제와 부품 구성을 담당하는 프론트엔드 기능입니다.

UI 컴포넌트는 `components/mybuild`, 화면 상태와 사용자 흐름은 `screens/mybuild`, 서버 통신과 타입은 `services/mybuild`, 화면 전환은 `router`에서 관리합니다.

## 주요 기능

- 내 견적 목록 및 상세 조회
- 빈 견적 생성
- 견적명과 공개 여부 수정
- CPU, GPU, 메인보드, 파워, CPU 쿨러, 케이스 추가·교체·제거
- 메모리와 저장장치 복수 선택 및 수량 증감
- 서버에서 계산한 총 견적 금액 표시
- 견적 삭제
- 로딩, 빈 목록, 오류, 로그인 필요 상태 처리
- 당겨서 새로고침 및 화면 복귀 시 목록 자동 갱신

## 디렉터리 구성

```text
components/mybuild
├─ MyBuildCard.tsx
├─ MyBuildCard.styles.ts
└─ index.ts

screens/mybuild
├─ MyBuildListScreen.tsx
├─ MyBuildFormScreen.tsx
├─ MyBuildDetailScreen.tsx
├─ MyBuildPartPickerScreen.tsx
├─ *.styles.ts
└─ index.ts

services/mybuild
├─ api.ts
└─ index.ts
```

## 컴포넌트

### MyBuildCard

목록의 견적 하나를 카드로 표현하는 컴포넌트입니다. 서버 요청이나 화면 이동을 직접 처리하지 않고 선택 이벤트만 상위 화면에 전달합니다.

| Prop | 타입 | 설명 |
| --- | --- | --- |
| `build` | `MyBuild` | 표시할 견적 데이터 |
| `onPress` | `() => void` | 카드 선택 시 호출되는 선택적 콜백 |

카드에는 공개 여부, 견적명, 마지막 수정일, 선택 부품 수와 총금액을 표시합니다.

```tsx
<MyBuildCard
  build={item}
  onPress={() => navigation.navigate('MyBuildDetail', {
    buildId: item.buildId,
  })}
/>
```

## 화면

### MyBuildListScreen

`GET /api/my-builds/me`를 호출하여 사용자의 견적 목록을 표시합니다.

- Access Token이 없으면 로그인 필요 상태 표시
- 로딩 인디케이터와 오류 재시도 제공
- 목록이 비어 있으면 새 견적 생성 버튼 표시
- 화면이 다시 활성화되면 목록 자동 갱신
- 카드 선택 시 상세 화면으로 이동

### MyBuildFormScreen

견적명과 공개 여부를 입력하여 빈 견적을 생성합니다.

```json
{
  "buildName": "200만원 게이밍 PC",
  "publicBuild": false
}
```

생성에 성공하면 목록을 거치지 않고 생성된 견적의 상세 화면으로 이동합니다.

### MyBuildDetailScreen

견적 상세 조회와 편집을 담당합니다.

- 서버에서 계산된 총금액 표시
- 견적명 저장
- 공개 여부 즉시 변경
- 부품 추가·변경 화면 이동
- 단일 부품 제거
- 메모리와 저장장치 수량 감소 및 제거
- 확인 대화상자를 거친 견적 삭제

단일 부품과 복수 부품은 서버 데이터 구조에 맞춰 다르게 처리합니다.

| 분류 | 처리 방식 |
| --- | --- |
| CPU, GPU, 메인보드, 파워, 쿨러, 케이스 | 하나의 ID를 전달하여 추가 또는 교체 |
| 메모리, 저장장치 | `{ id, quantity }[]` 전체 배열을 전달하여 교체 |

### MyBuildPartPickerScreen

기존 Equipment Service로 카테고리별 부품 목록을 조회하고 선택한 부품을 견적에 반영합니다.

- 단일 부품을 선택하면 기존 부품을 즉시 교체
- 새로운 메모리·저장장치를 선택하면 수량 1로 추가
- 이미 선택한 메모리·저장장치를 다시 선택하면 수량 1 증가

## Service

`services/mybuild/api.ts`는 MyBuild 타입과 인증이 필요한 API 함수를 제공합니다. 모든 요청에 `Authorization: Bearer <Access Token>` 헤더를 사용합니다.

| 함수 | Method / Endpoint | 설명 |
| --- | --- | --- |
| `fetchMyBuilds` | `GET /api/my-builds/me` | 내 견적 목록 조회 |
| `fetchMyBuild` | `GET /api/my-builds/me/{buildId}` | 내 견적 상세 조회 |
| `createMyBuild` | `POST /api/my-builds/me` | 새 견적 생성 |
| `updateMyBuild` | `PATCH /api/my-builds/me/{buildId}` | 기본 정보 또는 부품 수정 |
| `removeMyBuildPart` | `DELETE /api/my-builds/me/{buildId}/parts/{partType}` | 단일 부품 제거 |
| `deleteMyBuild` | `DELETE /api/my-builds/me/{buildId}` | 견적 삭제 |

`totalPrice`와 `userId`는 클라이언트가 계산하거나 요청에 포함하지 않습니다. 서버 응답 값을 그대로 사용합니다.

## 라우터 구조

```text
MainTabs
└─ MyBuild
   └─ MyBuildListScreen
      ├─ MyBuildCreate
      │  └─ MyBuildFormScreen
      └─ MyBuildDetail
         ├─ MyBuildDetailScreen
         └─ MyBuildPartPicker
            └─ MyBuildPartPickerScreen
```

| Route | Params |
| --- | --- |
| `MyBuild` | 없음 |
| `MyBuildCreate` | 없음 |
| `MyBuildDetail` | `{ buildId: number }` |
| `MyBuildPartPicker` | `{ buildId: number, categoryKey: string }` |

생성·상세·부품 선택 화면은 로그인 세션이 있을 때만 Root Stack에 등록됩니다.

## 실행 및 확인

모바일 프로젝트 디렉터리에서 실행합니다.

```powershell
cd C:\Users\user\noveforge\novforge-mobile
npm start
```

실제 데이터 조회와 변경을 확인하려면 Novforge API 서버가 실행 중이어야 하며, 앱의 `EXPO_PUBLIC_API_BASE_URL`이 접근 가능한 API 주소를 가리켜야 합니다.

TypeScript 검사:

```powershell
npm exec tsc -- --noEmit
```

## 책임 분리

| 위치 | 책임 |
| --- | --- |
| `components/mybuild` | 재사용 가능한 견적 카드 UI |
| `screens/mybuild` | 화면 상태, 입력, 확인 대화상자, 화면 이동 |
| `services/mybuild` | DTO 타입, 인증 헤더, MyBuild API 요청 |
| `services/equipment` | 부품 카테고리와 선택 가능한 부품 목록 조회 |
| `router` | 탭과 Stack 화면 등록 및 라우트 파라미터 타입 |

