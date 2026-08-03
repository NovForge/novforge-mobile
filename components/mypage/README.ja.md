# MyPage コンポーネント

マイページ画面でユーザー情報を表示し、ログアウト動作をつなぐ表現コンポーネントを管理します。

このディレクトリは UI の描画とユーザーイベントの伝達のみを担当します。認証状態の確認、セッション情報の処理、画面遷移はそれぞれ Service、Screen、Router で処理します。

## ファイル構成

| ファイル | 役割 |
| --- | --- |
| `MyPageCard.tsx` | ユーザーアバター、ニックネーム、メール、ログアウトボタンを表示 |
| `MyPageCard.styles.ts` | MyPage カード UI のスタイル |
| `index.ts` | MyPage コンポーネントの公開入口 |

## MyPageCard

マイページ上部にユーザー情報をカード形式で描画します。セッションがある場合はプロフィール画像があれば表示し、なければニックネームの頭文字をアバター代替テキストとして表示します。

### Props

| Prop | 型 | 説明 |
| --- | --- | --- |
| `session` | `AuthSession \| null` | 現在のログインセッション情報 |
| `onExit` | `() => void` | ログアウトまたはログイン画面へ移動する動作 |

### 使用例

```tsx
<MyPageCard session={session} onExit={onExit} />
```

## 関連 Screen

### MyPageScreen

`screens/mypage/MyPageScreen.tsx` はマイページ画面です。`MyPageCard` を包んで SafeAreaView 内に配置します。

## 責務分離

| 配置 | 責務 |
| --- | --- |
| `components/mypage` | マイページカード UI の描画 |
| `screens/mypage` | マイページ画面の状態とレイアウト構成 |
| `services/auth` | セッションおよび認証関連データ管理 |
| `router` | マイページタブの登録 |
