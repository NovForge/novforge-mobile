# NovForge Mobile

PC 부품을 탐색하고 나만의 PC 견적을 구성·관리할 수 있는 Expo 기반 크로스 플랫폼 애플리케이션입니다. CPU, GPU, 메인보드 등 주요 부품의 상세 사양을 비교하고, 완성한 견적을 공개해 다른 사용자의 구성도 둘러볼 수 있습니다.

Android, iOS, Web을 하나의 React Native 코드베이스로 지원합니다.

## 목차

- [주요 기능](#주요-기능)
- [기술 스택](#기술-스택)
- [사전 요구 사항](#사전-요구-사항)
- [실행 방법](#실행-방법)
- [환경 변수](#환경-변수)
- [디렉토리 구조](#디렉토리-구조)
- [화면 및 라우팅](#화면-및-라우팅)
- [인증 및 세션](#인증-및-세션)
- [개발 스크립트](#개발-스크립트)
- [빌드 및 배포](#빌드-및-배포)

## 주요 기능

### PC 부품 탐색

- CPU, GPU, 메인보드, 메모리, 저장장치, 파워, CPU 쿨러, 케이스 카테고리 제공
- 제조사 또는 제품명 기반 통합 검색
- 가격, 설명 및 카테고리별 상세 사양 조회
- 로그인 사용자는 부품 상세 화면에서 기존 견적에 부품을 반영하거나 새 견적 생성 가능

### 내 견적

- PC 견적 생성·조회·수정·삭제
- CPU, GPU 등 단일 부품 추가 및 교체
- 메모리와 저장장치의 복수 구성 및 수량 관리
- 선택한 부품 가격을 반영한 총 견적 금액 확인
- 견적 이름과 공개 여부 설정
- 전체·공개·비공개 필터 제공

### 공개 견적

- 다른 사용자가 공개한 견적 목록 조회
- 공개 견적의 총금액과 전체 부품 구성 확인
- 공개 견적은 읽기 전용으로 제공

### Google 인증과 게스트 모드

- Google OAuth 기반 로그인 및 회원가입
- 최초 가입 시 서비스에서 사용할 닉네임 등록
- 로그인 없이 부품과 공개 견적을 확인하는 게스트 모드
- 로그인 사용자의 세션 유지, 로그아웃 및 회원 탈퇴

### 마이페이지

- 이름, 이메일, 닉네임과 프로필 이미지 조회
- 닉네임 수정
- JPEG, PNG, WebP 프로필 이미지 업로드
- 로그아웃 및 계정·저장 견적 삭제를 포함한 회원 탈퇴

### 관리자 장비 관리

- 관리자 계정에만 관리 탭 노출
- 카테고리별 장비 등록·수정·삭제
- 제조사 또는 제품명 검색
- 장비 유형별 상세 사양 입력

## 기술 스택

### Frontend Core

| 구분 | 기술 | 버전 |
| --- | --- | --- |
| 애플리케이션 프레임워크 | Expo | `~57.0.4` |
| UI 프레임워크 | React Native | `0.86.0` |
| React | React | `19.2.3` |
| 언어 | TypeScript | `~6.0.3` |
| Web 지원 | React Native Web | `^0.21.2` |

### 내비게이션 · 인증 · UI

| 구분 | 기술 |
| --- | --- |
| 내비게이션 | React Navigation 7 (Native Stack, Bottom Tabs) |
| OAuth | Expo AuthSession, Expo WebBrowser |
| 토큰 저장 | Expo SecureStore, Web Local Storage |
| 이미지 선택 | Expo ImagePicker |
| 아이콘 | Lucide React Native |
| 벡터 그래픽 | React Native SVG |

## 사전 요구 사항

실행 전 아래 환경이 준비되어 있어야 합니다.

- Node.js 22.13.x 이상
- npm
- Google OAuth 클라이언트 ID
- Android 실행 시 Android Studio 또는 Expo Go를 사용할 수 있는 기기
- iOS 시뮬레이터 실행 시 macOS와 Xcode, 또는 Expo Go를 사용할 수 있는 iOS 기기

Expo SDK 57의 React Native·React 및 최소 Node.js 호환 정보는 [Expo SDK 57 공식 문서](https://docs.expo.dev/versions/v57.0.0/)를 참고하세요.

## 실행 방법

### 1. 저장소 클론 및 의존성 설치

```bash
git clone <repository-url>
cd novforge-mobile
npm install
```

### 2. 환경 변수 설정

루트 디렉토리에 `.env` 파일을 생성하고 실행 환경에 맞는 값을 입력합니다.

```dotenv
EXPO_PUBLIC_API_BASE_URL=http://localhost:8080
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=your-web-client-id
EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID=your-android-client-id
EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID=your-ios-client-id
```

Web에서 고정된 OAuth 콜백 주소를 사용할 경우 다음 값도 설정합니다.

```dotenv
EXPO_PUBLIC_GOOGLE_WEB_REDIRECT_URI=http://localhost:8081/oauthredirect
```

### 3. Expo 개발 서버 실행

```bash
npm start
```

터미널의 QR 코드를 Expo Go로 스캔하거나 안내에 따라 Android, iOS 또는 Web 환경을 선택합니다.

플랫폼을 바로 지정할 수도 있습니다.

```bash
npm run android
npm run ios
npm run web
```

환경 변수를 변경했다면 Expo 개발 서버를 다시 시작하세요. 캐시까지 초기화하려면 `npx expo start --clear`를 사용할 수 있습니다.

## 환경 변수

Expo 클라이언트 코드에서 읽는 변수에는 `EXPO_PUBLIC_` 접두사가 필요합니다.

| 변수명 | 필수 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `EXPO_PUBLIC_API_BASE_URL` | 권장 | `http://localhost:8080` | NovForge API 베이스 URL |
| `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID` | Web 사용 시 | 없음 | Google OAuth Web 클라이언트 ID |
| `EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID` | Android 사용 시 | 없음 | Google OAuth Android 클라이언트 ID |
| `EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID` | iOS 사용 시 | 없음 | Google OAuth iOS 클라이언트 ID |
| `EXPO_PUBLIC_GOOGLE_WEB_REDIRECT_URI` | 선택 | Expo 생성 URI | Web OAuth 리다이렉트 URI |

`EXPO_PUBLIC_` 변수는 앱 번들에 포함되므로 비밀번호, 클라이언트 시크릿 등의 민감한 값을 저장하지 마세요.

## 디렉토리 구조

```text
novforge-mobile/
├── App.tsx                    # 세션 복원과 앱 최상위 상태
├── index.ts                   # Expo 앱 엔트리포인트
├── app.json                  # Expo 앱 및 플랫폼 설정
├── assets/                   # 앱 아이콘, 스플래시, 파비콘
├── components/               # 화면에서 재사용하는 UI 컴포넌트
│   ├── admin/                # 관리자 장비 관리 UI
│   ├── auth/                 # 로그인·회원가입 카드
│   ├── equipment/            # 부품 카드, 검색, 견적 반영 모달
│   ├── mybuild/              # 견적 카드와 읽기 전용 상세 UI
│   └── mypage/               # 프로필 카드와 수정·탈퇴 모달
├── navigation/               # 하단 내비게이션 바
├── router/                   # Stack·Tab 라우트 및 타입 정의
├── screens/                  # 화면 단위 컴포넌트
│   ├── admin/                # 관리자 장비 관리
│   ├── auth/                 # 인증 화면과 Google OAuth 흐름
│   ├── equipment/            # 부품 목록·상세
│   ├── mybuild/              # 견적 목록·생성·상세·부품 선택
│   └── mypage/               # 마이페이지
├── services/                 # API 호출, 데이터 타입, 인증 세션
│   ├── auth/
│   ├── equipment/
│   ├── mybuild/
│   └── users/
├── theme/                    # 공통 색상 토큰
├── package.json
└── tsconfig.json
```

### 디렉토리 역할 요약

| 경로 | 역할 |
| --- | --- |
| `screens/` | 라우트 단위 화면, 데이터 로딩과 화면 상태 관리 |
| `components/` | 도메인별 재사용 UI 컴포넌트와 스타일 |
| `services/` | REST API 호출, 응답 타입, 인증 세션 영속화 |
| `router/` | Native Stack과 Bottom Tab 구성 및 파라미터 타입 |
| `navigation/` | 커스텀 하단 탭 바 |
| `theme/` | 앱 전역 색상 팔레트 |

## 화면 및 라우팅

라우팅은 Expo Router가 아닌 React Navigation으로 구성되어 있습니다.

### 하단 탭

| 라우트 | 화면 | 접근 조건 |
| --- | --- | --- |
| `Equipment` | PC 부품 목록·검색 | 로그인 또는 게스트 |
| `MyBuild` | 공개 견적·내 견적 | 공개 견적은 전체, 내 견적은 로그인 필요 |
| `Admin` | 장비 관리 | 관리자만 노출 |
| `MyPage` | 프로필·계정 관리 | 로그인 또는 게스트 |

### Stack 화면

| 라우트 | 화면 | 주요 파라미터 |
| --- | --- | --- |
| `Auth` | Google 로그인·회원가입 | 없음 |
| `MainTabs` | 앱 메인 탭 | 없음 |
| `EquipmentDetail` | 부품 상세 | `categoryKey`, `itemId` |
| `MyBuildCreate` | 새 견적 생성 | 없음 |
| `MyBuildDetail` | 내 견적 상세·편집 | `buildId` |
| `PublicMyBuildDetail` | 공개 견적 상세 | `buildId` |
| `MyBuildPartPicker` | 견적에 넣을 부품 선택 | `buildId`, `categoryKey` |

## 인증 및 세션

### 로그인 흐름

1. 실행 플랫폼에 맞는 Google OAuth 클라이언트 ID를 선택합니다.
2. Google 인증으로 받은 ID 토큰으로 앱 로그인을 진행합니다.
3. 발급받은 액세스 토큰, 사용자 정보와 관리자 여부를 세션에 저장합니다.
4. 이후 인증이 필요한 API 요청에 `Authorization: Bearer <accessToken>` 헤더를 첨부합니다.

### 회원가입 흐름

1. Google 계정 인증을 진행합니다.
2. 닉네임과 Google ID 토큰으로 사용자 등록을 진행합니다.
3. 가입 완료 후 동일한 Google 계정으로 로그인합니다.

### 세션 저장

세션 키는 `novforge.auth.session`입니다.

| 플랫폼 | 저장소 |
| --- | --- |
| Android / iOS | Expo SecureStore |
| Web | `window.localStorage` |

저장 데이터에는 앱 세션과 만료 시각이 포함됩니다. 앱 시작 시 유효한 세션을 복원하며, 만료되었거나 손상된 세션은 자동으로 제거합니다. 게스트 상태는 영구 저장하지 않습니다.

## 개발 스크립트

| 명령어 | 설명 |
| --- | --- |
| `npm start` | Expo 개발 서버 실행 |
| `npm run android` | Android 대상으로 Expo 실행 |
| `npm run ios` | iOS 대상으로 Expo 실행 |
| `npm run web` | Web 대상으로 Expo 실행 |
| `npx tsc --noEmit` | TypeScript 타입 검사 |

## 빌드 및 배포

현재 `package.json`에는 개발 실행 스크립트만 정의되어 있습니다. 배포 바이너리는 Expo Application Services(EAS)를 설정한 뒤 플랫폼별로 빌드할 수 있습니다.

```bash
npx eas-cli@latest build:configure
npx eas-cli@latest build --platform android
npx eas-cli@latest build --platform ios
```

배포 전 다음 항목을 확인하세요.

- `app.json`의 Android 패키지명: `com.novforge.mobile`
- `app.json`의 iOS 번들 ID: `com.novforge.mobile`
- `novforge` 커스텀 URL 스킴과 Google OAuth 리다이렉트 설정
- 배포 환경의 API URL과 각 플랫폼 Google OAuth 클라이언트 ID
- Android·iOS 앱 아이콘과 스플래시 자산

Web 정적 번들이 필요하면 다음 명령을 사용합니다.

```bash
npx expo export --platform web
```

## 라이선스

이 프로젝트는 루트 `LICENSE` 파일의 MIT License를 따릅니다.
