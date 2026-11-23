# Storybook 초기 환경

이 구성은 이슈 #64의 초기 설정과 기본 예제를 포함합니다. 실제 공통 컴포넌트의 스토리, 디자인 토큰, 글로벌 스타일·폰트 통합은 후속 작업입니다.

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
npx vitest run --project=storybook
```

Vitest는 Chromium에서 예제 스토리와 상호작용을 실행합니다. 접근성 검사는 현재 `todo` 모드이므로 위반을 표시하지만 실패 처리하지 않습니다.

Storybook 관련 패키지는 내부 API 호환성을 위해 같은 버전으로 고정합니다. 버전을 올릴 때 본체와 애드온을 함께 갱신하고 정적 빌드와 스토리 테스트를 확인합니다.

Chromatic 애드온은 구성되어 있지만, 외부 서비스 업로드나 배포 설정은 이 초기 구성에 포함되지 않습니다.
