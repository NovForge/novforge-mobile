# Equipment 컴포넌트

PC 부품 카테고리 탐색과 목록 카드에 사용하는 표현 컴포넌트를 관리합니다.

이 디렉터리는 UI 렌더링과 사용자 이벤트 전달만 담당합니다. 부품 API 호출, 화면 상태, 상세 화면 이동은 각각 Service, Screen, Router에서 처리합니다.

## 파일 구성

| 파일 | 역할 |
| --- | --- |
| `CategoryTabs.tsx` | 부품 카테고리를 가로 탭으로 표시 |
| `EquipmentCard.tsx` | 부품 사진·제조사·이름·가격 카드 표시 |
| `equipment.styles.ts` | Equipment 컴포넌트 공통 스타일 |
| `index.ts` | Equipment 컴포넌트 공개 진입점 |

## CategoryTabs

`EQUIPMENT_CATEGORIES`를 가로 스크롤 탭으로 렌더링합니다. 선택된 카테고리를 강조하고, 사용자가 다른 탭을 누르면 상위 Screen에 선택 결과를 전달합니다.

### Props

| Prop | 타입 | 설명 |
| --- | --- | --- |
| `selected` | `EquipmentCategory` | 현재 선택된 카테고리 |
| `onSelect` | `(category: EquipmentCategory) => void` | 카테고리 선택 시 호출 |

### 사용 예시

```tsx
<CategoryTabs
  selected={category}
  onSelect={setCategory}
/>
```

## EquipmentCard

부품 목록의 한 항목을 카드로 표시합니다. `imageUrl`이 있으면 원격 이미지를 표시하고, 없으면 카테고리 이름을 이용한 플레이스홀더를 표시합니다.

### Props

| Prop | 타입 | 설명 |
| --- | --- | --- |
| `item` | `EquipmentItem` | 표시할 부품 데이터 |
| `categoryLabel` | `string` | 이미지가 없을 때 표시할 카테고리 이름 |
| `onPress` | `() => void` | 카드 클릭 시 호출 |

카드에는 다음 정보만 표시합니다.

- 부품 이미지 또는 플레이스홀더
- 제조사
- 부품 이름
- 원화 형식 가격

```tsx
<EquipmentCard
  item={item}
  categoryLabel={category.label}
  onPress={() => navigation.navigate('EquipmentDetail', {
    categoryKey: category.key,
    itemId: item.id,
  })}
/>
```

## 관련 Screen

### EquipmentListScreen

`screens/equipment/EquipmentListScreen.tsx`는 부품 목록 화면입니다.

| 상태 | 타입 | 설명 |
| --- | --- | --- |
| `category` | `EquipmentCategory` | 현재 선택된 카테고리 |
| `items` | `EquipmentItem[]` | API에서 조회한 목록 |
| `loading` | `boolean` | 목록 요청 진행 여부 |
| `error` | `string \| null` | 조회 실패 메시지 |

처리 흐름은 다음과 같습니다.

```text
화면 진입 또는 카테고리 변경
→ fetchEquipment(category, accessToken)
→ FlatList에 EquipmentCard 렌더링
→ 카드 클릭
→ EquipmentDetail 라우트로 categoryKey와 itemId 전달
```

로딩 인디케이터, 빈 목록, 오류 메시지, 다시 시도 기능을 제공합니다.

### EquipmentDetailScreen

`screens/equipment/EquipmentDetailScreen.tsx`는 독립된 부품 상세 화면입니다. 라우트 파라미터로 받은 카테고리와 ID를 사용하여 상세 API를 다시 호출합니다.

```text
EquipmentDetail
├─ categoryKey: string
└─ itemId: number
```

상세 화면에는 이미지, 제조사, 이름, 가격, 설명과 카테고리별 추가 사양을 표시합니다. 공통 필드를 제외한 DTO 필드를 상세 사양 목록으로 변환하며, Boolean 값은 `지원` 또는 `미지원`으로 표시합니다.

## Equipment Service

`services/equipment/api.ts`는 카테고리 설정, 공통 타입, 목록·상세 API를 제공합니다.

### EquipmentCategory

```ts
type EquipmentCategory = {
  key: string;
  label: string;
  endpoint: string;
};
```

### EquipmentItem

```ts
type EquipmentItem = {
  id: number;
  manufacturer: string;
  name: string;
  price: number;
  description?: string | null;
  imageUrl?: string | null;
  [key: string]: unknown;
};
```

인덱스 시그니처는 CPU, GPU, 메인보드처럼 카테고리마다 다른 상세 사양 필드를 함께 수용하기 위해 사용합니다.

### 지원 카테고리

| Key | 화면 이름 | Endpoint |
| --- | --- | --- |
| `cpu` | CPU | `GET /api/cpus` |
| `gpu` | GPU | `GET /api/gpus` |
| `motherboard` | 메인보드 | `GET /api/motherboards` |
| `memory` | 메모리 | `GET /api/memorys` |
| `storage` | 저장장치 | `GET /api/storages` |
| `power` | 파워 | `GET /api/power-supplies` |
| `cooler` | CPU 쿨러 | `GET /api/cpu-coolers` |
| `case` | 케이스 | `GET /api/cases` |

### 공개 함수

| 함수 | 반환값 | 설명 |
| --- | --- | --- |
| `fetchEquipment(category, accessToken?)` | `Promise<EquipmentItem[]>` | 선택 카테고리 목록 조회 |
| `fetchEquipmentDetail(categoryKey, itemId, accessToken?)` | `Promise<EquipmentItem>` | 특정 부품 상세 조회 |

Access Token이 있으면 `Authorization: Bearer` 헤더로 전달합니다. 목록·상세 조회에서 `401`이 발생하면 로그인 안내를 표시하고, 상세 조회에서 `404`가 발생하면 부품을 찾을 수 없다는 오류를 반환합니다.

## Router 연결

라우트 타입은 `router/routes.ts`, 화면 등록은 `router/AppRouter.tsx`에서 관리합니다.

```text
MainTabs
└─ Equipment
   └─ EquipmentListScreen
      └─ EquipmentDetail
         └─ EquipmentDetailScreen
```

`EquipmentDetail`은 Root Stack에 있으므로 상세 화면으로 이동하면 하단 탭 위에 새 화면이 쌓이고, 시스템 뒤로 가기 또는 헤더 뒤로 가기로 목록에 복귀합니다.

## 책임 분리

| 위치 | 책임 |
| --- | --- |
| `components/equipment` | 카테고리 탭과 부품 카드 UI |
| `screens/equipment` | 목록·상세 상태와 화면 구성 |
| `services/equipment` | 카테고리 정의, 타입, API 요청 |
| `router` | 목록·상세 라우트 등록과 파라미터 타입 |
| `navigation` | 앱 전역 하단 탭 UI |
