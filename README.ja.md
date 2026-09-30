# NovForge Mobile

PCパーツを検索し、自分だけのPC構成を作成・管理できるExpoベースのクロスプラットフォームアプリケーションです。CPU、GPU、マザーボードなど主要パーツの詳細スペックを比較し、完成した構成を公開してほかのユーザーの構成も閲覧できます。

Android、iOS、Webを単一のReact Nativeコードベースでサポートします。

## 目次

- [主な機能](#主な機能)
- [技術スタック](#技術スタック)
- [前提条件](#前提条件)
- [実行方法](#実行方法)
- [環境変数](#環境変数)
- [ディレクトリ構成](#ディレクトリ構成)
- [画面とルーティング](#画面とルーティング)
- [認証とセッション](#認証とセッション)
- [開発スクリプト](#開発スクリプト)
- [ビルドとデプロイ](#ビルドとデプロイ)

## 主な機能

### PCパーツ検索

- CPU、GPU、マザーボード、メモリ、ストレージ、電源、CPUクーラー、ケースのカテゴリを提供
- メーカー名または製品名による横断検索
- 価格、説明、カテゴリ別の詳細スペックを表示
- ログインユーザーはパーツ詳細画面から既存の構成へ反映、または新しい構成を作成可能

### マイ構成

- PC構成の作成・参照・編集・削除
- CPUやGPUなど単一パーツの追加・交換
- メモリとストレージの複数構成および数量管理
- 選択したパーツ価格を反映した合計金額の確認
- 構成名と公開範囲の設定
- すべて・公開・非公開フィルター

### 公開構成

- ほかのユーザーが公開した構成一覧を表示
- 公開構成の合計金額と全パーツ構成を確認
- 公開構成は読み取り専用で提供

### Google認証とゲストモード

- Google OAuthによるログイン・会員登録
- 初回登録時にサービスで使用するニックネームを設定
- ログインせずにパーツと公開構成を閲覧できるゲストモード
- ログインセッションの維持、ログアウト、退会

### マイページ

- 名前、メールアドレス、ニックネーム、プロフィール画像を表示
- ニックネームの変更
- JPEG、PNG、WebP形式のプロフィール画像をアップロード
- ログアウト、およびアカウントと保存済み構成を削除する退会機能

### 管理者向け機器管理

- 管理者アカウントにのみ管理タブを表示
- カテゴリ別の機器登録・編集・削除
- メーカー名または製品名による検索
- 機器タイプ別の詳細スペック入力

## 技術スタック

### Frontend Core

| 区分 | 技術 | バージョン |
| --- | --- | --- |
| アプリケーションフレームワーク | Expo | `~57.0.4` |
| UIフレームワーク | React Native | `0.86.0` |
| React | React | `19.2.3` |
| 言語 | TypeScript | `~6.0.3` |
| Web対応 | React Native Web | `^0.21.2` |

### ナビゲーション・認証・UI

| 区分 | 技術 |
| --- | --- |
| ナビゲーション | React Navigation 7（Native Stack、Bottom Tabs） |
| OAuth | Expo AuthSession、Expo WebBrowser |
| トークン保存 | Expo SecureStore、Web Local Storage |
| 画像選択 | Expo ImagePicker |
| アイコン | Lucide React Native |
| ベクターグラフィック | React Native SVG |

## 前提条件

実行前に以下の環境を用意してください。

- Node.js 22.13.x以上
- npm
- Google OAuthクライアントID
- Android実行時：Android Studio、またはExpo Goを利用できる端末
- iOSシミュレーター実行時：macOSとXcode、またはExpo Goを利用できるiOS端末

Expo SDK 57とReact Native・React・Node.jsの互換性については、[Expo SDK 57公式ドキュメント](https://docs.expo.dev/versions/v57.0.0/)を参照してください。

## 実行方法

### 1. リポジトリのクローンと依存関係のインストール

```bash
git clone <repository-url>
cd novforge-mobile
npm install
```

### 2. 環境変数の設定

ルートディレクトリに`.env`ファイルを作成し、実行環境に合わせて値を設定します。

```dotenv
EXPO_PUBLIC_API_BASE_URL=http://localhost:8080
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=your-web-client-id
EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID=your-android-client-id
EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID=your-ios-client-id
```

Webで固定のOAuthコールバックURLを使う場合は、次の値も設定します。

```dotenv
EXPO_PUBLIC_GOOGLE_WEB_REDIRECT_URI=http://localhost:8081/oauthredirect
```

### 3. Expo開発サーバーの起動

```bash
npm start
```

ターミナルに表示されるQRコードをExpo Goで読み取るか、案内に従ってAndroid、iOS、Webのいずれかを選択します。

プラットフォームを直接指定することもできます。

```bash
npm run android
npm run ios
npm run web
```

環境変数を変更した場合はExpo開発サーバーを再起動してください。キャッシュも削除する場合は`npx expo start --clear`を使用できます。

## 環境変数

Expoのクライアントコードから参照する変数には`EXPO_PUBLIC_`プレフィックスが必要です。

| 変数名 | 必須 | デフォルト | 説明 |
| --- | --- | --- | --- |
| `EXPO_PUBLIC_API_BASE_URL` | 推奨 | `http://localhost:8080` | NovForge APIのベースURL |
| `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID` | Web使用時 | なし | Google OAuth WebクライアントID |
| `EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID` | Android使用時 | なし | Google OAuth AndroidクライアントID |
| `EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID` | iOS使用時 | なし | Google OAuth iOSクライアントID |
| `EXPO_PUBLIC_GOOGLE_WEB_REDIRECT_URI` | 任意 | Expo生成URI | Web OAuthリダイレクトURI |

`EXPO_PUBLIC_`変数はアプリのバンドルに含まれます。パスワードやクライアントシークレットなどの機密情報は保存しないでください。

## ディレクトリ構成

```text
novforge-mobile/
├── App.tsx                    # セッション復元とアプリ最上位の状態
├── index.ts                   # Expoアプリのエントリーポイント
├── app.json                  # Expoアプリとプラットフォーム設定
├── assets/                   # アプリアイコン、スプラッシュ、favicon
├── components/               # 再利用可能なUIコンポーネント
│   ├── admin/                # 管理者向け機器管理UI
│   ├── auth/                 # ログイン・会員登録カード
│   ├── equipment/            # パーツカード、検索、構成反映モーダル
│   ├── mybuild/              # 構成カードと読み取り専用詳細UI
│   └── mypage/               # プロフィールカード、編集・退会モーダル
├── navigation/               # ボトムナビゲーションバー
├── router/                   # Stack・Tabルートと型定義
├── screens/                  # 画面単位のコンポーネント
│   ├── admin/                # 管理者向け機器管理
│   ├── auth/                 # 認証画面とGoogle OAuthフロー
│   ├── equipment/            # パーツ一覧・詳細
│   ├── mybuild/              # 構成一覧・作成・詳細・パーツ選択
│   └── mypage/               # マイページ
├── services/                 # API呼び出し、データ型、認証セッション
│   ├── auth/
│   ├── equipment/
│   ├── mybuild/
│   └── users/
├── theme/                    # 共通カラートークン
├── package.json
└── tsconfig.json
```

### ディレクトリの役割

| パス | 役割 |
| --- | --- |
| `screens/` | ルート単位の画面、データ読み込み、画面状態の管理 |
| `components/` | ドメイン別の再利用可能なUIコンポーネントとスタイル |
| `services/` | REST API呼び出し、レスポンス型、認証セッションの永続化 |
| `router/` | Native Stack、Bottom Tab、パラメータ型の構成 |
| `navigation/` | カスタムボトムタブバー |
| `theme/` | アプリ共通のカラーパレット |

## 画面とルーティング

ルーティングにはExpo RouterではなくReact Navigationを使用しています。

### ボトムタブ

| ルート | 画面 | アクセス条件 |
| --- | --- | --- |
| `Equipment` | PCパーツ一覧・検索 | ログインまたはゲスト |
| `MyBuild` | 公開構成・マイ構成 | 公開構成は全員、マイ構成はログイン必須 |
| `Admin` | 機器管理 | 管理者のみ表示 |
| `MyPage` | プロフィール・アカウント管理 | ログインまたはゲスト |

### Stack画面

| ルート | 画面 | 主なパラメータ |
| --- | --- | --- |
| `Auth` | Googleログイン・会員登録 | なし |
| `MainTabs` | アプリのメインタブ | なし |
| `EquipmentDetail` | パーツ詳細 | `categoryKey`, `itemId` |
| `MyBuildCreate` | 新しい構成の作成 | なし |
| `MyBuildDetail` | マイ構成の詳細・編集 | `buildId` |
| `PublicMyBuildDetail` | 公開構成の詳細 | `buildId` |
| `MyBuildPartPicker` | 構成に追加するパーツの選択 | `buildId`, `categoryKey` |

## 認証とセッション

### ログインフロー

1. 実行プラットフォームに対応するGoogle OAuthクライアントIDを選択します。
2. Google認証で取得したIDトークンを使ってアプリへログインします。
3. 発行されたアクセストークン、ユーザー情報、管理者権限をセッションに保存します。
4. 認証が必要なAPIリクエストに`Authorization: Bearer <accessToken>`ヘッダーを付与します。

### 会員登録フロー

1. Googleアカウント認証を行います。
2. ニックネームとGoogle IDトークンでユーザー登録を行います。
3. 登録完了後、同じGoogleアカウントでログインします。

### セッション保存

セッションキーは`novforge.auth.session`です。

| プラットフォーム | 保存先 |
| --- | --- |
| Android / iOS | Expo SecureStore |
| Web | `window.localStorage` |

保存データにはアプリセッションと有効期限が含まれます。アプリ起動時に有効なセッションを復元し、期限切れまたは破損したセッションは自動的に削除します。ゲスト状態は永続化しません。

## 開発スクリプト

| コマンド | 説明 |
| --- | --- |
| `npm start` | Expo開発サーバーを起動 |
| `npm run android` | Android向けにExpoを起動 |
| `npm run ios` | iOS向けにExpoを起動 |
| `npm run web` | Web向けにExpoを起動 |
| `npx tsc --noEmit` | TypeScriptの型チェック |

## ビルドとデプロイ

現在の`package.json`には開発用スクリプトのみ定義されています。配布用バイナリはExpo Application Services（EAS）を設定した後、プラットフォームごとにビルドできます。

```bash
npx eas-cli@latest build:configure
npx eas-cli@latest build --platform android
npx eas-cli@latest build --platform ios
```

デプロイ前に以下を確認してください。

- `app.json`のAndroidパッケージ名：`com.novforge.mobile`
- `app.json`のiOSバンドルID：`com.novforge.mobile`
- `novforge`カスタムURLスキームとGoogle OAuthリダイレクト設定
- デプロイ環境のAPI URLと各プラットフォーム用Google OAuthクライアントID
- Android・iOS用のアプリアイコンとスプラッシュ画像

Web向けの静的バンドルが必要な場合は次のコマンドを使用します。

```bash
npx expo export --platform web
```

## ライセンス

このプロジェクトにはルートの`LICENSE`ファイルに記載されたMIT Licenseが適用されます。
