# Admin 컴포넌트

관리자 장비 화면의 헤더, 검색 도구, 장비 행, 등록·수정 폼과 오류 메시지에 사용하는 표현 컴포넌트를 관리합니다.

이 디렉터리는 UI 렌더링과 사용자 이벤트 전달만 담당합니다. 장비 API 호출, 검색·폼 상태, 등록·수정·삭제 흐름은 Screen에서 처리하고 관리자 권한은 Auth Service와 API에서 확인합니다.

## 파일 구성

| 파일 | 역할 |
| --- | --- |
| `AdminHeader.tsx` | 관리자 화면 제목과 새 장비 추가 버튼 표시 |
| `AdminEquipmentToolbar.tsx` | 장비 검색 입력과 검색 결과 개수 표시 |
| `AdminEquipmentRow.tsx` | 장비 정보와 수정·삭제 버튼 표시 |
| `AdminEquipmentFormModal.tsx` | 카테고리별 장비 등록·수정 입력 폼 표시 |
| `AdminErrorBanner.tsx` | 화면 수준 오류 메시지 표시 |
| `admin.styles.ts` | Admin 컴포넌트 공통 스타일 |
| `index.ts` | Admin 컴포넌트 공개 진입점 |

## AdminHeader

관리자 화면 제목과 새 장비 추가 버튼을 렌더링합니다. 추가 버튼을 누르면 상위 Screen에 이벤트를 전달합니다.

### Props

| Prop | 타입 | 설명 |
| --- | --- | --- |
| `onAdd` | `() => void` | 새 장비 추가 버튼 클릭 시 호출 |

```tsx
<AdminHeader onAdd={() => openForm()} />
```

## AdminEquipmentToolbar

제조사 또는 제품명 검색 입력과 현재 검색 결과 개수를 표시합니다.

### Props

| Prop | 타입 | 설명 |
| --- | --- | --- |
| `query` | `string` | 현재 검색어 |
| `count` | `number` | 검색 결과 개수 |
| `onQueryChange` | `(value: string) => void` | 검색어 변경 시 호출 |

```tsx
<AdminEquipmentToolbar
  query={query}
  count={filtered.length}
  onQueryChange={setQuery}
/>
```

## AdminEquipmentRow

장비 목록의 한 항목을 행으로 표시합니다. 제조사, 제품명, 원화 형식 가격을 보여주고 수정·삭제 이벤트를 상위 Screen에 전달합니다.

### Props

| Prop | 타입 | 설명 |
| --- | --- | --- |
| `item` | `EquipmentItem` | 표시할 장비 데이터 |
| `onEdit` | `() => void` | 수정 버튼 클릭 시 호출 |
| `onDelete` | `() => void` | 삭제 버튼 클릭 시 호출 |

```tsx
<AdminEquipmentRow
  item={item}
  onEdit={() => openForm(item)}
  onDelete={() => remove(item)}
/>
```

## AdminEquipmentFormModal

선택한 카테고리의 `EquipmentField[]`를 기반으로 등록·수정 입력 폼을 동적으로 렌더링합니다. 텍스트, 숫자, Boolean, 여러 줄 입력을 지원하며 저장 로직은 직접 처리하지 않습니다.

### Props

| Prop | 타입 | 설명 |
| --- | --- | --- |
| `visible` | `boolean` | 모달 표시 여부 |
| `category` | `EquipmentCategory` | 현재 장비 카테고리 |
| `fields` | `EquipmentField[]` | 카테고리별 입력 필드 |
| `item` | `EquipmentItem \| null` | 수정할 장비, 등록 시 `null` |
| `values` | `AdminFormValues` | 현재 입력값 |
| `error` | `string \| null` | 폼 오류 메시지 |
| `saving` | `boolean` | 저장 요청 진행 여부 |
| `onChange` | `(key, value) => void` | 입력값 변경 시 호출 |
| `onClose` | `() => void` | 모달 닫기 시 호출 |
| `onSave` | `() => void` | 저장 버튼 클릭 시 호출 |

## AdminErrorBanner

목록 조회, 저장 또는 삭제 실패 메시지를 배너로 표시합니다.

| Prop | 타입 | 설명 |
| --- | --- | --- |
| `message` | `string` | 표시할 오류 메시지 |
| `onDismiss` | `() => void` | 오류 배너 닫기 시 호출 |

## 관련 Screen

### AdminEquipmentScreen

`screens/admin/AdminEquipmentScreen.tsx`는 관리자 장비 화면입니다.

| 상태 | 타입 | 설명 |
| --- | --- | --- |
| `category` | `EquipmentCategory` | 현재 선택한 장비 카테고리 |
| `items` | `EquipmentItem[]` | API에서 조회한 장비 목록 |
| `query` | `string` | 장비 검색어 |
| `editing` | `EquipmentItem \| null \| undefined` | 수정 대상 또는 폼 표시 상태 |
| `values` | `AdminFormValues` | 등록·수정 폼 입력값 |
| `loading` / `saving` | `boolean` | 조회·저장 요청 진행 여부 |
| `error` | `string \| null` | 조회·CRUD 실패 메시지 |

처리 흐름은 다음과 같습니다.

```text
카테고리 선택
→ fetchEquipment로 장비 목록 조회
→ AdminEquipmentRow 목록 렌더링
→ 새 장비 또는 수정 선택
→ AdminEquipmentFormModal 표시
→ createEquipment 또는 updateEquipment 호출
→ 저장 성공 후 목록 다시 조회
```

삭제는 확인 대화상자를 거친 뒤 `deleteEquipment`를 호출합니다.

## Equipment Service

`services/equipment/api.ts`는 관리자 화면에서 사용하는 카테고리별 필드 정의와 CRUD 함수를 제공합니다.

| 함수 | Method | 설명 |
| --- | --- | --- |
| `fetchEquipment` | `GET` | 선택 카테고리 장비 목록 조회 |
| `createEquipment` | `POST` | 새 장비 등록 |
| `updateEquipment` | `PATCH` | 기존 장비 수정 |
| `deleteEquipment` | `DELETE` | 기존 장비 삭제 |

등록·수정·삭제 요청에는 Access Token을 `Authorization: Bearer` 헤더로 전달하며 API에서 `ROLE_ADMIN` 권한을 검사합니다.

## Router 연결

관리자 탭은 `router/AppRouter.tsx`에서 로그인 세션의 `isAdmin`이 `true`일 때만 등록됩니다.

```text
MainTabs
└─ Admin
   └─ AdminEquipmentScreen
```

관리자 여부는 API `.env`의 `ADMIN_EMAILS`와 로그인 이메일을 비교한 로그인 응답 값입니다. 기존 세션에 `isAdmin`이 없으면 로그아웃 후 다시 로그인해야 합니다.

## 책임 분리

| 위치 | 책임 |
| --- | --- |
| `components/admin` | 관리자 장비 화면 UI 렌더링과 이벤트 전달 |
| `screens/admin` | 목록·검색·폼 상태와 CRUD 흐름 관리 |
| `services/equipment` | 장비 타입, 필드 정의, 목록·CRUD API 요청 |
| `services/auth` | 로그인 세션과 `isAdmin` 정보 관리 |
| `router` | 관리자 계정의 Admin 탭 등록 |
