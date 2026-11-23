# Storybook 디자인 시스템

이슈 #64의 공통 컴포넌트 카탈로그입니다. `Components`는 앱에서 사용하는
컴포넌트를 직접 가져오고 `Foundations`는 실제 스타일·토큰을 보여줍니다.
`Example`은 설치 시 생성된 참고 예제입니다.

## 구성과 스타일

- `.storybook/preview.tsx`에서 앱의 `src/app/globals.css`를 가져옵니다. Tailwind
  4는 기존 PostCSS 설정을 사용합니다.
- SUIT-Variable은 앱과 같은 로컬 `/fonts/` 파일로 로드합니다. 별도의 폰트 CSS나
  외부 CDN에 의존하지 않습니다.
- Emotion 스타일과 Next.js App Router/Link 동작은 `Foundations/Environment`에서
  확인합니다.
- 색상은 `globals.css`에서, 기본 크기·행간·간격·브레이크포인트는 Tailwind에서
  가져옵니다. `src/stories/foundations/tokens.ts`는 클래스와 참조 목록이며 별도
  테마 사본이 아닙니다.
- 현재 Button은 `ButtonThemes.ts`가 아닌 `globals.css`의 `btn-*` 클래스를
  사용하므로 스토리도 실제 CSS를 기준으로 합니다.
- 상단 Controls에서 props를, Actions에서 이벤트를, Viewport에서 375/768/1440px
  레이아웃을 확인합니다.

## 공통 컴포넌트

| 컴포넌트  | 확인할 상태와 동작                                                                    |
| --------- | ------------------------------------------------------------------------------------- |
| Button    | 4가지 색상, 4가지 크기, 비활성화, Next.js 링크, 긴 한·영 레이블, 클릭 이벤트          |
| Input     | text/email/password/number, disabled/readOnly, 에러 연결, 긴 placeholder, 텍스트 입력 |
| FormInput | 실제 react-hook-form 검증·제출, 필수/선택, 오류, 비활성화, 로딩, 긴 레이블            |
| CheckBox  | 선택/해제, 비활성화, 레이블 클릭, 키보드 Space, 긴 레이블                             |
| Toast     | success/error/info/warning, 수동 닫기, 자동 종료, 긴 메시지                           |

Autodocs에서 props와 각 스토리의 소스를 확인할 수 있습니다. 지원하지 않는 상태를
스토리에서 임의로 구현하지 않습니다. 예를 들어 Button에는 로딩 전용 prop이 없고,
링크 모드에서는 button의 disabled/onClick 전달을 지원하지 않습니다.

## 실행

```sh
npm ci
npm run storybook
```

개발 서버는 기본적으로 `http://localhost:6006`에서 실행됩니다.

```sh
npm run build-storybook
```

정적 결과는 Git에서 제외된 `storybook-static/`에 생성됩니다.

## 스토리 테스트

```sh
npx playwright install chromium
npm run test-storybook
```

Vitest는 Chromium에서 전체 스토리와 상호작용을 실행합니다.
`@storybook/addon-vitest`가 전역 preview 설정을 자동 적용합니다. 토큰에서
사용하는 Tailwind 의존성은 사전 번들링하여 첫 테스트 도중 재로딩을 방지합니다.

자동 검증은 CSS·폰트 로딩, 입력/제출, 체크박스 포커스·Space, 비활성화 동작,
토스트 닫기 콜백과 색상 표시를 포함합니다. 외부 Firebase 데이터나 실제 사용자
계정은 사용하지 않습니다.

## 디자인과 접근성 확인

- 부드러운 모서리, 충분한 간격, 옅은 테두리와 한 가지 강조색을 우선합니다.
  그림자는 필요한 곳에만 사용합니다.
- 모바일과 데스크톱에서 `LongLabel`, `LongPlaceholder`, `LongMessage`를
  확인합니다. 단일 행 input의 placeholder는 공간에 따라 일부만 보일 수 있으므로
  별도의 레이블을 제공하세요.
- 키보드로 컨트롤에 접근하고 포커스가 보이는지 확인합니다. CheckBox의 네이티브
  input은 시각적으로만 숨겨 키보드와 스크린리더 접근을 유지합니다.
- 접근성 애드온은 `todo` 모드입니다. 전체 스토리 테스트 성공이 모든 접근성
  항목의 통과를 뜻하지 않습니다. 기존 색상 대비, FormInput 오류의 보조기술 연결,
  Toast의 상태 알림 역할은 별도 점검 대상입니다.

## 추가할 때

실제 컴포넌트의 import를 사용하고 `Components/이름`으로 등록합니다. 기본 상태,
지원하는 변형, disabled/error 등 상태, 긴 한국어·영어 예제와 중요한 상호작용의
`play` 검증을 함께 추가합니다. 새로운 토큰을 문서화할 때는 원본 CSS 또는
Tailwind 정의를 참조합니다.

Storybook 관련 패키지는 내부 API 호환성을 위해 같은 버전으로 고정합니다. 버전을
올릴 때 본체와 애드온을 함께 갱신하고 정적 빌드와 스토리 테스트를 확인합니다.

Chromatic 애드온은 구성되어 있지만 외부 업로드·호스팅·Storybook 전용 CI 자동화는
설정하지 않았습니다. Header/Footer/Sidebar처럼 페이지 문맥이 필요한 컴포넌트는
선택적 확장 대상입니다.

## 검증 기록 (2026-11-23)

- TypeScript와 변경 파일 ESLint 통과
- Chromium 스토리 테스트 50개 통과 (기존 예제 포함)
- Storybook 정적 빌드 및 Next.js 프로덕션 빌드 통과
- 색상·타이포그래피 및 긴 레이블/메시지 스토리 7개를 375/768/1440px에서 확인: 21개 조합 모두 가로 넘침 없음
- 모바일 CheckBox 키보드 포커스 표시, FormInput 한·영 레이블, Toast 긴 메시지와 데스크톱 색상표를 캡처하여 검토
- axe 점검에서 기존 Button의 `secondary`, `linePrimary`에 `color-contrast` 위반 각 1개 확인. FormInput 오류, CheckBox, Toast 성공 스토리에서는 해당 점검의 위반 없음. 자동 점검이 보조기술을 통한 수동 검토를 대체하지는 않음

Button의 기존 제품 색상 변경은 이 카탈로그 작업에 포함하지 않았습니다. 접근성 `todo`를 `error`로 강화하기 전에 대비를 개선하고 전체 상태를 재검증해야 합니다.
