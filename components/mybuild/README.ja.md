# MyBuild コンポーネント

ログインユーザーのPC構成見積もりの作成・参照・編集・削除、およびパーツ構成を管理するフロントエンド機能です。

UIコンポーネントは `components/mybuild`、画面状態とユーザーフローは `screens/mybuild`、サーバー通信と型定義は `services/mybuild`、画面遷移は `router` で管理します。

## 主な機能

- 自分の見積もり一覧・詳細の取得
- 空の見積もりの作成
- 見積もり名と公開設定の変更
- CPU、GPU、マザーボード、電源、CPUクーラー、ケースの追加・交換・削除
- メモリとストレージの複数選択および数量変更
- サーバーが計算した合計金額の表示
- 見積もりの削除
- ローディング、空の一覧、エラー、ログイン必須状態の表示
- Pull to Refresh、および画面復帰時の一覧自動更新

## ディレクトリ構成

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

## コンポーネント

### MyBuildCard

一覧内の見積もりをカードとして表示するコンポーネントです。サーバー通信や画面遷移は直接処理せず、選択イベントのみ親画面へ渡します。

| Prop | 型 | 説明 |
| --- | --- | --- |
| `build` | `MyBuild` | 表示する見積もりデータ |
| `onPress` | `() => void` | カード選択時に呼び出す任意のコールバック |

カードには公開状態、見積もり名、最終更新日、選択済みパーツ数、合計金額を表示します。

```tsx
<MyBuildCard
  build={item}
  onPress={() => navigation.navigate('MyBuildDetail', {
    buildId: item.buildId,
  })}
/>
```

## 画面

### MyBuildListScreen

`GET /api/my-builds/me` を呼び出し、ユーザーの見積もり一覧を表示します。

- Access Tokenがない場合はログイン必須状態を表示
- ローディング表示とエラー時の再試行を提供
- 一覧が空の場合は新規作成ボタンを表示
- 画面が再度アクティブになると一覧を自動更新
- カード選択時に詳細画面へ移動

### MyBuildFormScreen

見積もり名と公開設定を入力して、空の見積もりを作成します。

```json
{
  "buildName": "20万円のゲーミングPC",
  "publicBuild": false
}
```

作成に成功すると、一覧画面を経由せず作成した見積もりの詳細画面へ移動します。

### MyBuildDetailScreen

見積もりの詳細表示と編集を担当します。

- サーバーで計算された合計金額の表示
- 見積もり名の保存
- 公開設定の即時変更
- パーツ追加・変更画面への移動
- 単一パーツの削除
- メモリとストレージの数量減少・削除
- 確認ダイアログを経由した見積もり削除

単一パーツと複数パーツは、サーバーのデータ構造に合わせて別々に処理します。

| 分類 | 処理方法 |
| --- | --- |
| CPU、GPU、マザーボード、電源、クーラー、ケース | 1つのIDを送信して追加または交換 |
| メモリ、ストレージ | `{ id, quantity }[]` の配列全体を送信して置換 |

### MyBuildPartPickerScreen

既存のEquipment Serviceを利用してカテゴリ別のパーツ一覧を取得し、選択したパーツを見積もりへ反映します。

- 単一パーツを選択すると既存パーツを即時交換
- 新しいメモリ・ストレージを選択すると数量1で追加
- 選択済みのメモリ・ストレージを再度選択すると数量を1増加

## Service

`services/mybuild/api.ts` はMyBuildの型と認証が必要なAPI関数を提供します。すべてのリクエストで `Authorization: Bearer <Access Token>` ヘッダーを使用します。

| 関数 | Method / Endpoint | 説明 |
| --- | --- | --- |
| `fetchMyBuilds` | `GET /api/my-builds/me` | 自分の見積もり一覧を取得 |
| `fetchMyBuild` | `GET /api/my-builds/me/{buildId}` | 自分の見積もり詳細を取得 |
| `createMyBuild` | `POST /api/my-builds/me` | 新しい見積もりを作成 |
| `updateMyBuild` | `PATCH /api/my-builds/me/{buildId}` | 基本情報またはパーツを更新 |
| `removeMyBuildPart` | `DELETE /api/my-builds/me/{buildId}/parts/{partType}` | 単一パーツを削除 |
| `deleteMyBuild` | `DELETE /api/my-builds/me/{buildId}` | 見積もりを削除 |

`totalPrice` と `userId` はクライアントで計算したり、リクエストへ含めたりしません。サーバーのレスポンス値をそのまま使用します。

## ルーター構成

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
| `MyBuild` | なし |
| `MyBuildCreate` | なし |
| `MyBuildDetail` | `{ buildId: number }` |
| `MyBuildPartPicker` | `{ buildId: number, categoryKey: string }` |

作成・詳細・パーツ選択画面は、ログインセッションがある場合のみRoot Stackへ登録されます。

## 実行と確認

モバイルプロジェクトのディレクトリで実行します。

```powershell
cd C:\Users\user\noveforge\novforge-mobile
npm start
```

実データの取得・変更を確認するにはNovforge APIサーバーを起動し、アプリの `EXPO_PUBLIC_API_BASE_URL` がアクセス可能なAPIアドレスを指している必要があります。

TypeScriptチェック：

```powershell
npm exec tsc -- --noEmit
```

## 責務の分離

| 場所 | 責務 |
| --- | --- |
| `components/mybuild` | 再利用可能な見積もりカードUI |
| `screens/mybuild` | 画面状態、入力、確認ダイアログ、画面遷移 |
| `services/mybuild` | DTO型、認証ヘッダー、MyBuild APIリクエスト |
| `services/equipment` | パーツカテゴリと選択可能なパーツ一覧の取得 |
| `router` | タブ・Stack画面の登録とルートパラメータ型 |

