# Equipmentコンポーネント

PCパーツのカテゴリ選択と一覧カードで使用する表示コンポーネントを管理します。

このディレクトリはUIの描画とユーザーイベントの通知のみを担当します。パーツAPI、画面状態、詳細画面への遷移は、それぞれService、Screen、Routerで処理します。

## ファイル構成

| ファイル | 役割 |
| --- | --- |
| `CategoryTabs.tsx` | パーツカテゴリを横スクロールタブで表示 |
| `EquipmentCard.tsx` | 画像・メーカー・名前・価格をカードで表示 |
| `equipment.styles.ts` | Equipmentコンポーネント共通スタイル |
| `index.ts` | Equipmentコンポーネントの公開エントリーポイント |

## CategoryTabs

`EQUIPMENT_CATEGORIES`を横スクロールタブとして描画します。選択中のカテゴリを強調し、別のタブが押されたときに選択結果を上位Screenへ通知します。

### Props

| Prop | 型 | 説明 |
| --- | --- | --- |
| `selected` | `EquipmentCategory` | 現在選択されているカテゴリ |
| `onSelect` | `(category: EquipmentCategory) => void` | カテゴリ選択時に呼び出す |

### 使用例

```tsx
<CategoryTabs selected={category} onSelect={setCategory} />
```

## EquipmentCard

一覧の1件をカードとして表示します。`imageUrl`がある場合はリモート画像を表示し、ない場合はカテゴリ名を使ったプレースホルダーを表示します。

### Props

| Prop | 型 | 説明 |
| --- | --- | --- |
| `item` | `EquipmentItem` | 表示するパーツデータ |
| `categoryLabel` | `string` | 画像がない場合に表示するカテゴリ名 |
| `onPress` | `() => void` | カードを押したときに呼び出す |

カードには画像、メーカー、名前、ウォン表記の価格のみを表示します。

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

## 関連Screen

### EquipmentListScreen

`screens/equipment/EquipmentListScreen.tsx`はパーツ一覧画面です。

| 状態 | 型 | 説明 |
| --- | --- | --- |
| `category` | `EquipmentCategory` | 現在選択中のカテゴリ |
| `items` | `EquipmentItem[]` | APIから取得した一覧 |
| `loading` | `boolean` | 一覧リクエストの処理状態 |
| `error` | `string \| null` | 取得失敗メッセージ |

```text
画面表示またはカテゴリ変更
→ fetchEquipment(category, accessToken)
→ FlatListにEquipmentCardを描画
→ カードを選択
→ EquipmentDetailへcategoryKeyとitemIdを渡す
```

ローディング、空一覧、エラー、再試行UIを提供します。

### EquipmentDetailScreen

`screens/equipment/EquipmentDetailScreen.tsx`は独立したパーツ詳細画面です。Route ParamのカテゴリとIDを使って詳細APIを再度呼び出します。

```text
EquipmentDetail
├─ categoryKey: string
└─ itemId: number
```

画像、メーカー、名前、価格、説明、カテゴリ固有の仕様を表示します。共通フィールド以外のDTOフィールドを仕様一覧へ変換し、Boolean値は`対応`または`非対応`として表示します。

## Equipment Service

`services/equipment/api.ts`はカテゴリ設定、共通型、一覧・詳細APIを提供します。

```ts
type EquipmentCategory = {
  key: string;
  label: string;
  endpoint: string;
};

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

インデックスシグネチャはCPU、GPU、マザーボードなど、カテゴリごとに異なる仕様フィールドを保持するために使用します。

### 対応カテゴリ

| Key | 表示名 | Endpoint |
| --- | --- | --- |
| `cpu` | CPU | `GET /api/cpus` |
| `gpu` | GPU | `GET /api/gpus` |
| `motherboard` | マザーボード | `GET /api/motherboards` |
| `memory` | メモリ | `GET /api/memorys` |
| `storage` | ストレージ | `GET /api/storages` |
| `power` | 電源 | `GET /api/power-supplies` |
| `cooler` | CPUクーラー | `GET /api/cpu-coolers` |
| `case` | ケース | `GET /api/cases` |

### 公開関数

| 関数 | 戻り値 | 説明 |
| --- | --- | --- |
| `fetchEquipment(category, accessToken?)` | `Promise<EquipmentItem[]>` | 選択カテゴリの一覧を取得 |
| `fetchEquipmentDetail(categoryKey, itemId, accessToken?)` | `Promise<EquipmentItem>` | 指定パーツの詳細を取得 |

Access Tokenがある場合は`Authorization: Bearer`ヘッダーで送信します。`401`ではログイン案内を返し、詳細取得の`404`ではパーツが見つからないエラーを返します。

## Router連携

Route型は`router/routes.ts`、画面登録は`router/AppRouter.tsx`で管理します。

```text
MainTabs
└─ Equipment
   └─ EquipmentListScreen
      └─ EquipmentDetail
         └─ EquipmentDetailScreen
```

`EquipmentDetail`はRoot Stackにあるため、詳細画面は下部タブの上に積まれ、システムまたはヘッダーの戻る操作で一覧へ戻ります。

## 画像パス

機器の `imageUrl` が `/equipment-images/...` 形式の相対パスの場合、`EXPO_PUBLIC_API_BASE_URL` を先頭に追加してAPIの静的画像を表示します。`http://` または `https://` で始まる外部画像URLはそのまま使用します。

## 責務の分離

| 場所 | 責務 |
| --- | --- |
| `components/equipment` | カテゴリタブとパーツカードUI |
| `screens/equipment` | 一覧・詳細の状態と画面構成 |
| `services/equipment` | カテゴリ定義、型、APIリクエスト |
| `router` | 一覧・詳細Routeとパラメータ型 |
| `navigation` | アプリ共通の下部タブUI |
