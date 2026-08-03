# Adminコンポーネント

管理者向け機器画面のヘッダー、検索、機器行、登録・編集フォーム、エラーメッセージに使用する表示コンポーネントを管理します。

このディレクトリはUIの描画とユーザーイベントの通知のみを担当します。機器API、検索・フォーム状態、登録・更新・削除の処理はScreenで管理し、管理者権限はAuth ServiceとAPIで確認します。

## ファイル構成

| ファイル | 役割 |
| --- | --- |
| `AdminHeader.tsx` | 画面タイトルと新規機器追加ボタンを表示 |
| `AdminEquipmentToolbar.tsx` | 検索入力と検索結果件数を表示 |
| `AdminEquipmentRow.tsx` | 機器情報と編集・削除ボタンを表示 |
| `AdminEquipmentFormModal.tsx` | カテゴリ別の登録・編集フォームを表示 |
| `AdminErrorBanner.tsx` | 画面レベルのエラーメッセージを表示 |
| `admin.styles.ts` | Adminコンポーネント共通スタイル |
| `index.ts` | Adminコンポーネントの公開エントリーポイント |

## AdminHeader

管理画面のタイトルと新規機器追加ボタンを描画します。

| Prop | 型 | 説明 |
| --- | --- | --- |
| `onAdd` | `() => void` | 追加ボタン選択時に呼び出す |

## AdminEquipmentToolbar

メーカーまたは製品名の検索入力と現在の検索結果件数を表示します。

| Prop | 型 | 説明 |
| --- | --- | --- |
| `query` | `string` | 現在の検索語 |
| `count` | `number` | 検索結果件数 |
| `onQueryChange` | `(value: string) => void` | 検索語変更時に呼び出す |

## AdminEquipmentRow

機器一覧の1件を行として表示し、編集・削除イベントを上位Screenへ通知します。

| Prop | 型 | 説明 |
| --- | --- | --- |
| `item` | `EquipmentItem` | 表示する機器データ |
| `onEdit` | `() => void` | 編集ボタン選択時に呼び出す |
| `onDelete` | `() => void` | 削除ボタン選択時に呼び出す |

## AdminEquipmentFormModal

選択カテゴリの`EquipmentField[]`を使って登録・編集フォームを動的に描画します。テキスト、数値、Boolean、複数行入力に対応します。

| Prop | 型 | 説明 |
| --- | --- | --- |
| `visible` | `boolean` | モーダルの表示状態 |
| `category` | `EquipmentCategory` | 現在の機器カテゴリ |
| `fields` | `EquipmentField[]` | カテゴリ別入力フィールド |
| `item` | `EquipmentItem \| null` | 編集対象。新規登録時は`null` |
| `values` | `AdminFormValues` | 現在の入力値 |
| `error` | `string \| null` | フォームエラーメッセージ |
| `saving` | `boolean` | 保存処理状態 |
| `onChange` | `(key, value) => void` | 入力値変更時に呼び出す |
| `onClose` | `() => void` | モーダルを閉じるときに呼び出す |
| `onSave` | `() => void` | 保存ボタン選択時に呼び出す |

## AdminErrorBanner

一覧取得、保存、削除の失敗メッセージを表示します。

| Prop | 型 | 説明 |
| --- | --- | --- |
| `message` | `string` | 表示するエラーメッセージ |
| `onDismiss` | `() => void` | バナーを閉じるときに呼び出す |

## 関連Screen

`screens/admin/AdminEquipmentScreen.tsx`が一覧・検索・フォーム状態とCRUD処理を管理し、このディレクトリのコンポーネントを組み合わせます。

```text
カテゴリ選択
→ fetchEquipmentで一覧取得
→ AdminEquipmentRowを描画
→ 新規追加または編集を選択
→ AdminEquipmentFormModalを表示
→ createEquipmentまたはupdateEquipmentを呼び出す
→ 保存後に一覧を再取得
```

## Equipment Service

`services/equipment/api.ts`がカテゴリ別フィールド定義と一覧・CRUD APIを提供します。

| 関数 | Method | 説明 |
| --- | --- | --- |
| `fetchEquipment` | `GET` | 選択カテゴリの一覧を取得 |
| `createEquipment` | `POST` | 新しい機器を登録 |
| `updateEquipment` | `PATCH` | 既存機器を更新 |
| `deleteEquipment` | `DELETE` | 既存機器を削除 |

登録・更新・削除ではAccess Tokenを送信し、APIが`ROLE_ADMIN`権限を検証します。

## Router連携

ログインセッションの`isAdmin`が`true`の場合のみ、`router/AppRouter.tsx`がAdminタブを登録します。

```text
MainTabs
└─ Admin
   └─ AdminEquipmentScreen
```

## 責務の分離

| 場所 | 責務 |
| --- | --- |
| `components/admin` | 管理者向け機器UIの描画とイベント通知 |
| `screens/admin` | 一覧・検索・フォーム状態とCRUD処理 |
| `services/equipment` | 機器型、フィールド定義、一覧・CRUD API |
| `services/auth` | ログインセッションと`isAdmin`情報 |
| `router` | 管理者向けAdminタブの登録 |
