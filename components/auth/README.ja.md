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
| `services/auth.ts` | バックエンド認証APIと認証関連の型 |
| `services/session.ts` | Access Tokenセッションの保存・復元・削除 |

`AuthCard`からAPIを直接呼び出したり、セッションを保存したりしません。認証方式やバックエンド実装が変わってもUIコンポーネントを独立して維持できるよう、この境界を守ります。

## 関連する環境変数

```env
EXPO_PUBLIC_API_BASE_URL=http://localhost:8080
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=your-web-client-id.apps.googleusercontent.com
EXPO_PUBLIC_GOOGLE_WEB_REDIRECT_URI=http://localhost:8081/oauthredirect
EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID=your-android-client-id.apps.googleusercontent.com
EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID=your-ios-client-id.apps.googleusercontent.com
```

Client Secretはフロントエンドコードや`EXPO_PUBLIC_*`環境変数に保存しません。
