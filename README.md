# Portfolio

프론트엔드개발자로서의 포트폴리오 프로젝트입니다.

개발 기간: 2024-07-24 ~ 진행중

## Convention

커밋메시지 컨벤션은
[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) 가이드를
기반으로 하며, 명확하고 일관성 있는 커밋 메시지를 작성하기 위한 규칙입니다.

### 커밋 메시지 구조

```
<type>(<scope>): <subject>
```

- **`<type>`**: 변경 사항의 유형을 나타냅니다.
- **`<scope>`** _(선택사항)_: 변경 사항의 범위를 나타냅니다 (예: 파일, 컴포넌트
  이름).
- **`<subject>`**: 간결한 변경 사항 설명 (현재형 동사로 시작).

### `<type>` 유형

- **`feat`**: 새로운 기능 추가
  - _예_: `feat(header): add responsive navigation bar`
- **`fix`**: 버그 수정
  - _예_: `fix(sidebar): resolve hydration error`
- **`docs`**: 문서 관련 작업
  - _예_: `docs(readme): update installation instructions`
- **`style`**: 코드 포맷팅, 세미콜론 누락 등 코드 변경이 없는 작업
  - _예_: `style(global): apply consistent indentation`
- **`refactor`**: 코드 리팩토링 (기능 변화 없음)
  - _예_: `refactor(api): optimize fetch logic`
- **`test`**: 테스트 추가 또는 수정
  - _예_: `test(utils): add unit tests for formatDate`
- **`chore`**: 빌드 프로세스 또는 기타 잡무 수정
  - _예_: `chore(deps): update dependencies`
- **`perf`**: 성능 개선
  - _예_: `perf(image): reduce image load time`
- **`ci`**: CI 설정 및 스크립트 변경
  - _예_: `ci(workflows): add deploy job`
- **`revert`**: 이전 커밋을 되돌릴 때 사용
  - _예_: `revert: fix(nav): resolve alignment issue`

### 커밋 메시지의 예

1. **`feat` 예시**:

   ```
   feat(auth): implement user login functionality
   ```

2. **`fix` 예시**:

   ```
   fix(header): resolve navigation rendering bug
   ```

3. **`chore` 예시**:

   ```
   chore(package): update dependencies to latest versions
   ```

4. **`style` 예시**:
   ```
   style(button): apply consistent padding and margin
   ```

## Architecture

## 개발환경

- Node.js 22 이상 (CI: 22.x, 24.x)
- NextJS
- npm (`npm ci`로 lockfile 기준 설치)
- ESlint & Prettier

### 보안 의존성 관리

Firebase Admin 14는 모듈별 import를 사용하며, 서버 실행 환경도 Node.js 22
이상이어야 합니다. 초기화는 요청 시점에 수행합니다.

`package.json`의 보안 override는 다음 상위 패키지에만 적용합니다.

- `@firebase/firestore` → `@grpc/grpc-js`: 기존 1.9.x 제약 대신 수정된
  1.14.7 이상을 사용합니다.
- `@typescript-eslint/typescript-estree` → `minimatch`: 취약한 10.x 대신
  11.0.1 이상을 사용합니다.

- `google-gax`, `gaxios` → `rimraf`: Firestore 하위의 취약한 glob 경로를
  제거하기 위해 6.1.4 이상을 사용합니다.

상위 패키지가 수정 버전을 직접 지원하면 해당 override를 제거하고
`npm audit`, `npm run lint`, `npm run build`를 다시 확인합니다.

## Skills

## Libraries

- TailwindCSS
- Supabase ?

## flowchart

```mermaid
---
title: 🔥 jngmnj portfolio website 🔥
---
flowchart LR
	Home[메인화면]
    Sidebar(사이드바)
    Header(헤더)
    Footer(푸터)
    PostList(블로그글 목록)
    ProjectList(프로젝트 리스트)

    Home --- Header
	Home --- Footer

    Create[글 작성화면]
    Admin[어드민 화면]
    Chatbot[챗봇 화면]
    About[About Me]
    Projects[Projects]
    Contact[Contact]
    Blog[Blog]
    ChatbotResult(챗봇 답변)
    ProjectDetail[프로젝트 상세 화면]
    PostDetail[글 상세 화면]

    Athorize{인증여부}


    TagList[태그 목록 화면]
    Tag(태그별 글 목록)
    Category(카테고리 별 글 목록)

    Header -.-> About
    Header -.-> Projects --- ProjectList -.-> ProjectDetail
    Header -.-> Contact
    Header -.-> Blog --- PostList -.-> PostDetail --- Sidebar
    Header -.-> Chatbot --- ChatbotResult
    ChatbotResult -.-> PostDetail
    ChatbotResult -.-> ProjectList
    PostList -.-> TagList -.-> Tag -.-> Detail
    Sidebar -.-> Category -.-> Detail
    Footer --> Athorize -.->|Yes| Create -.-> Detail
    Athorize -.->|No|Admin
    Footer -.-> Admin -.-> Create
```
