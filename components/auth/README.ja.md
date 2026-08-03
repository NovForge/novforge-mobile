# Authコンポーネント

Googleアカウントによる会員登録・ログイン画面で使用する表示コンポーネントを管理します。

このディレクトリのコンポーネントは、画面の描画とユーザー入力の通知のみを担当します。Google OAuth、バックエンドAPIの呼び出し、セッション保存などの認証ロジックは含みません。

## ファイル構成

| ファイル | 役割 |
| --- | --- |
| `AuthCard.tsx` | ログイン、会員登録、ニックネーム入力、ゲスト利用のUI |
| `AuthCard.styles.ts` | `AuthCard`専用スタイル |
| `index.ts` | Authコンポーネントの公開エントリーポイント |

## AuthCard

`AuthCard`は現在の認証ステップに応じたUIを描画し、ユーザー操作をコールバックとして上位画面へ通知する制御コンポーネントです。

### Props

| Prop | 型 | 説明 |
| --- | --- | --- |
| `onLogin` | `() => void` | Googleログインボタンを押したときに呼び出す |
| `onStartSignup` | `() => void` | Google会員登録ボタンを押したときに呼び出す |
| `onCompleteSignup` | `() => void` | ニックネーム入力後、会員登録完了ボタンを押したときに呼び出す |
| `onGuestPress` | `() => void` | ゲスト利用ボタンを押したときに呼び出す |
| `onNicknameChange` | `(value: string) => void` | ニックネームの入力値が変わったときに呼び出す |
| `nickname` | `string` | 現在のニックネーム入力値 |
| `signupStep` | `boolean` | `true`の場合、ニックネーム入力と会員登録完了UIを表示 |
| `isLoading` | `boolean` | 処理中のローディング表示とボタン無効化を制御 |
| `googleEnabled` | `boolean` | Google認証の準備状態に応じて認証ボタンを有効化 |
| `error` | `string \| null` | ユーザーに表示する認証エラーメッセージ |

### 使用例

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

## 認証フロー

実際のフローは`screens/auth/AuthScreen.tsx`で制御します。

### ログイン

```text
Googleでログイン
→ Google ID Tokenを発行
→ POST /api/auth/google
→ Google UIDで登録済みユーザーを照会
→ Novforge Access Tokenを保存
```

### 会員登録

```text
Googleで会員登録
→ Google ID Tokenを発行
→ ニックネームを入力
→ POST /api/users
→ Google UIDとユーザー情報を保存
→ POST /api/auth/google
→ ログインセッションを保存
```

## 責務の分離

| 場所 | 責務 |
| --- | --- |
| `components/auth` | 認証UIとユーザーイベントの通知 |
| `screens/auth` | OAuthレスポンスとログイン・会員登録ステップの制御 |
| `services/auth/api.ts` | バックエンド認証APIと認証関連の型 |
| `services/auth/session.ts` | Access Tokenセッションの保存・復元・削除 |

`AuthCard`からAPIを直接呼び出したり、セッションを保存したりしません。認証方式やバックエンド実装が変わってもUIコンポーネントを独立して維持できるよう、この境界を守ります。

## AuthScreenの詳細

`screens/auth/AuthScreen.tsx`はAuth機能のコンテナ画面です。Google OAuthリクエストを生成し、レスポンスに応じてログインまたは会員登録フローを進めます。

### Props

| Prop | 型 | 説明 |
| --- | --- | --- |
| `onAuthenticated` | `(session: AuthSession) => void` | ログイン完了後、保存したセッションを上位アプリへ通知 |
| `onGuest` | `() => void` | 認証せずにゲストモードへ切り替え |

### 内部状態

| 状態 | 型 | 説明 |
| --- | --- | --- |
| `intent` | `'login' \| 'signup' \| null` | 現在のGoogle認証リクエストの目的 |
| `isLoading` | `boolean` | OAuthまたはバックエンドリクエストの処理状態 |
| `error` | `string \| null` | 画面に表示するエラーメッセージ |
| `signupIdToken` | `string \| null` | 会員登録ステップで一時的に保持するGoogle ID Token |
| `nickname` | `string` | 会員登録で使用するニックネーム |

### 主な処理

| 処理 | 説明 |
| --- | --- |
| `startGoogle()` | プラットフォーム別Client IDを確認してGoogle認証画面を起動 |
| OAuthレスポンスの`useEffect` | 成功・エラー・キャンセルを判定し、ログインまたはニックネーム入力へ進む |
| `login()` | Google ID Tokenをバックエンドへ渡し、Novforgeセッションを保存 |
| `completeSignup()` | ニックネームとGoogle ID Tokenで登録した後、自動ログイン |

Google認証のスコープは`openid`、`profile`、`email`です。アカウント選択画面を常に表示し、Webでは設定されたRedirect URI、ネイティブでは`novforge://oauthredirect`形式のURIを使用します。

## 認証APIの詳細

`services/auth/api.ts`は認証APIリクエストと共通の認証型を提供します。

### 公開関数

| 関数 | リクエスト | 戻り値 | 説明 |
| --- | --- | --- | --- |
| `loginWithGoogle(idToken)` | `POST /api/auth/google` | `Promise<AuthSession>` | Google UIDで登録済みユーザーを照会し、Novforge Access Tokenを発行 |
| `signupWithGoogle(idToken, userNickname)` | `POST /api/users` | `Promise<AuthUser>` | Googleユーザー情報とニックネームをDBに保存 |

### リクエストBody

```json
// POST /api/auth/google
{
  "idToken": "google-id-token"
}
```

```json
// POST /api/users
{
  "idToken": "google-id-token",
  "userNickname": "novforge-user"
}
```

### 主な型

```ts
type AuthUser = {
  userId: number;
  userName: string;
  userNickname: string;
  userEmail: string;
  profileImage: string | null;
};

type AuthSession = {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  user: AuthUser;
};
```

成功以外のHTTPレスポンスは、ステータスコードとサーバーメッセージを持つ`ApiError`へ変換します。サーバーがJSON形式のエラーメッセージを返さない場合は、既定のメッセージを使用します。

## セッション管理の詳細

`services/auth/session.ts`はキー`novforge.auth.session`でログインセッションを管理します。

| 関数 | 説明 |
| --- | --- |
| `saveSession(session)` | セッションと計算した有効期限を保存 |
| `loadSession()` | 保存値を復元し、有効なセッションまたは`null`を返す |
| `clearSession()` | 保存された認証セッションを削除 |

保存形式は次のとおりです。

```ts
type StoredSession = {
  session: AuthSession;
  expiresAt: number;
};
```

- Web: `window.localStorage`
- Android/iOS: Expo `SecureStore`
- 有効期限切れのセッション: 自動削除して`null`を返す
- 不正なJSONまたはAccess Tokenの欠落: 自動削除して`null`を返す

Google ID Tokenはセッションに保存しません。バックエンドが発行したNovforge Access Tokenとユーザー情報のみを保存します。

## Appとの連携

ルートの`App.tsx`は起動時に`loadSession()`を呼び出します。有効なセッションがなければ`AuthScreen`を表示し、認証完了後は受け取った`AuthSession`でログイン状態を表示します。ログアウト時は`clearSession()`を呼び出し、ゲスト状態も初期化します。

```text
アプリ起動
├─ 有効なセッションあり → ログイン完了状態
├─ 有効なセッションなし → AuthScreen
└─ ゲストを選択 → ゲスト状態

ログアウトまたはログイン画面へ移動
→ 保存セッションを削除
→ 認証状態を初期化
→ AuthScreen
```

## エラー処理

| 状況 | 処理 |
| --- | --- |
| プラットフォーム用Google Client IDがない | 認証画面を開かず設定エラーを表示 |
| Google認証のキャンセル | ローディング状態を解除 |
| Google認証エラー | Googleのエラーメッセージまたは既定メッセージを表示 |
| ID Tokenがない | Token取得失敗メッセージを表示 |
| 未登録アカウントでログイン | 会員登録案内を表示 |
| ニックネーム未入力 | バックエンドへ送信する前に入力案内を表示 |
| バックエンドエラー | サーバーが返したエラーメッセージを表示 |

## 関連する環境変数

```env
EXPO_PUBLIC_API_BASE_URL=http://localhost:8080
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=your-web-client-id.apps.googleusercontent.com
EXPO_PUBLIC_GOOGLE_WEB_REDIRECT_URI=http://localhost:8081/oauthredirect
EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID=your-android-client-id.apps.googleusercontent.com
EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID=your-ios-client-id.apps.googleusercontent.com
```

Client Secretはフロントエンドコードや`EXPO_PUBLIC_*`環境変数に保存しません。
