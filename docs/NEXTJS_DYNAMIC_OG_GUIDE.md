# Next.js 동적 OG 이미지 구조 가이드

## 목적

이 문서는 포트폴리오의 페이지별·프로젝트별 Open Graph 이미지 구현 방향을
정리한다. 특히 모든 경로에 `layout.tsx`를 추가하지 않고 Next.js App Router의
공식 Metadata API와 metadata file convention을 활용하는 구조를 목표로 한다.

## 결론

경로마다 `layout.tsx`를 만들 필요는 없다.

- 사이트 공통 메타데이터는 상위 `[lang]/layout.tsx`에 둔다.
- 페이지 하나에만 필요한 메타데이터는 해당 `page.tsx`에서 선언한다.
- 동적 데이터가 필요한 페이지는 `page.tsx`의 `generateMetadata`에서 데이터를
  조회한다.
- 동적 세그먼트별 OG 이미지는 `[id]/opengraph-image.tsx`를 우선 고려한다.
- `?id=...`처럼 쿼리 문자열에 따라 메타데이터가 달라지는 경우에는
  `searchParams`를 받을 수 있는 `page.tsx`에서 처리한다.
- Client Component 페이지는 Server Component인 `page.tsx`와 실제 Client UI
  컴포넌트로 분리한다.

## Next.js 공식 동작

### `metadata`와 `generateMetadata`

Next.js는 `layout.tsx`와 `page.tsx` 모두에서 `metadata` 또는 `generateMetadata`
내보내기를 지원한다.

- 정적 값은 `metadata` 객체를 사용한다.
- 라우트 파라미터나 외부 데이터에 의존하면 `generateMetadata`를 사용한다.
- 두 API는 Server Component에서만 사용할 수 있다.
- 동일한 라우트 세그먼트에서 `metadata`와 `generateMetadata`를 동시에 내보낼 수
  없다.
- 하위 세그먼트의 메타데이터는 상위 세그먼트의 메타데이터와 병합되며, 중첩
  필드는 더 구체적인 세그먼트 값으로 대체될 수 있다.

공식 문서:

- [generateMetadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Metadata and OG images](https://nextjs.org/docs/app/getting-started/metadata-and-og-images)

### `params`와 `searchParams`

`generateMetadata`에서 사용할 수 있는 값은 파일 위치에 따라 다르다.

| 위치         | `params` | `searchParams` |
| ------------ | -------- | -------------- |
| `layout.tsx` | 가능     | 불가능         |
| `page.tsx`   | 가능     | 가능           |

따라서 현재 프로젝트 상세 모달 URL처럼 쿼리 문자열을 사용하는 경우에는
`layout.tsx`만으로 처리할 수 없다.

```text
/ko/projects?id=PROJECT_ID
```

위 URL의 프로젝트별 메타데이터는 `projects/page.tsx`의 `generateMetadata`에서
`searchParams.id`를 읽어 생성해야 한다.

### `opengraph-image.tsx`

Next.js는 동적 OG 이미지를 위한 `opengraph-image.tsx` 파일 규칙을 제공한다.
파일을 라우트 세그먼트에 배치하면 Next.js가 이미지 엔드포인트와 `og:image` 메타
태그를 자동으로 연결한다.

```text
app/[lang]/projects/[id]/opengraph-image.tsx
```

동적 세그먼트에 배치된 `opengraph-image.tsx`는 해당 경로의 `params`를 받을 수
있다.

```tsx
import { ImageResponse } from 'next/og';

export const alt = '프로젝트 소개';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang, id } = await params;
  const project = await getProjectOgData(id, lang);

  return new ImageResponse(
    (
      <div>
        <strong>{project?.title}</strong>
        <p>{project?.description}</p>
        <span>Jungmin Ji · Frontend Engineer</span>
      </div>
    ),
    size
  );
}
```

공식 문서:

- [`opengraph-image`와 `twitter-image` 규칙](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image)
- [Metadata file conventions](https://nextjs.org/docs/app/api-reference/file-conventions/metadata)

## 권장 디렉터리 구조

```text
src/app/[lang]/
├─ layout.tsx
├─ page.tsx
├─ about/
│  └─ page.tsx
├─ projects/
│  ├─ page.tsx
│  └─ [id]/
│     ├─ page.tsx
│     └─ opengraph-image.tsx
├─ blog/
│  ├─ page.tsx
│  ├─ BlogPageClient.tsx
│  └─ [id]/
│     ├─ page.tsx
│     ├─ BlogDetailClient.tsx
│     └─ opengraph-image.tsx
└─ mypage/
   ├─ page.tsx
   └─ MyPageClient.tsx
```

### 상위 `[lang]/layout.tsx`

다음과 같이 모든 페이지가 공유하는 값만 관리한다.

- `metadataBase`
- 기본 제목과 설명
- favicon과 manifest
- robots
- authors, creator, publisher
- 사이트 기본 Open Graph 값

페이지별 제목이나 설명을 판별하기 위해 상위 레이아웃에서 현재 pathname을 직접
읽는 방식은 사용하지 않는다. Server Component 레이아웃에는 `usePathname`을
사용할 수 없고, `searchParams`도 전달되지 않는다.

### 서버 페이지

서버 페이지는 해당 `page.tsx`에서 바로 메타데이터를 선언한다.

```tsx
export const metadata = {
  title: '소개 | 지정민',
  description: '프론트엔드 엔지니어 지정민의 경험과 강점을 소개합니다.',
};
```

다국어 값이나 외부 데이터가 필요하면 `generateMetadata`를 사용한다.

```tsx
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return createPageMetadata({ lang, page: 'about', path: '/about' });
}
```

### Client Component 페이지

`'use client'`가 선언된 파일에서는 `metadata` 또는 `generateMetadata`를 내보낼
수 없다. 이 경우 라우트의 `page.tsx`를 Server Component로 유지하고, 기존 UI를
별도의 Client Component로 옮긴다.

```tsx
// blog/page.tsx
import BlogPageClient from './BlogPageClient';

export async function generateMetadata() {
  return {
    title: '블로그 | 지정민',
  };
}

export default function BlogPage() {
  return <BlogPageClient />;
}
```

```tsx
// blog/BlogPageClient.tsx
'use client';

export default function BlogPageClient() {
  // hooks와 기존 UI 코드
}
```

## 프로젝트 상세 OG 처리

프로젝트 상세 공유 방식은 두 가지를 모두 지원해야 한다.

### 독립 상세 경로

```text
/{lang}/projects/{id}
```

- `[id]/page.tsx`의 `generateMetadata`에서 프로젝트를 조회한다.
- `[id]/opengraph-image.tsx`에서 같은 ID로 프로젝트별 이미지를 생성한다.
- 프로젝트명과 설명은 현재 언어에 맞게 선택한다.

### 쿼리 기반 모달 경로

```text
/{lang}/projects?id={id}
```

- `projects/page.tsx`의 `generateMetadata`에서 `searchParams.id`를 읽는다.
- `id`가 있으면 프로젝트별 제목, 설명, OG 이미지를 반환한다.
- `id`가 없으면 프로젝트 목록용 메타데이터를 반환한다.

`opengraph-image.tsx`에는 페이지의 `searchParams`가 전달되지 않으므로 쿼리 기반
모달 URL은 별도의 OG 이미지 URL을 메타데이터에 지정하거나, 프로젝트 상세를 독립
경로로 정규화해야 한다.

## 프로젝트 데이터 선택 규칙

프로젝트별 OG에서는 다음 순서로 필드를 선택한다.

| 언어   | 제목                | 설명                            |
| ------ | ------------------- | ------------------------------- |
| 한국어 | `title`             | `description`                   |
| 영어   | `titleEn` → `title` | `descriptionEn` → `description` |

조회 실패, 삭제된 프로젝트, 잘못된 ID의 경우에는 프로젝트 공통 OG 문구를
사용한다.

```text
프로젝트 상세 | 지정민
프로젝트에서 고민하고 구현한 과정과 결과를 확인해 보세요.
```

## 캐시 고려사항

- `opengraph-image.tsx`는 기본적으로 캐시될 수 있다.
- 프로젝트 조회 `fetch`에는 적절한 `revalidate` 값을 지정한다.
- 프로젝트 수정 직후 OG를 즉시 갱신해야 하면 태그 기반 재검증 또는 관련 경로
  재검증을 연결한다.
- 제목과 설명이 길면 이미지 렌더링에서만 글자 수를 제한하고, HTML 메타데이터에는
  원문을 유지한다.

## 현재 구현에 대한 리팩터링 방향

현재 경로별 `layout.tsx` 구현은 동작하지만 메타데이터만을 위해 빈 레이아웃이
반복된다.

권장 후속 작업:

1. 서버 페이지의 `generateMetadata`를 각 `page.tsx`로 이동한다.
2. Client Component 페이지를 Server `page.tsx`와 Client UI 파일로 분리한다.
3. 메타데이터 전용 `layout.tsx`를 제거한다.
4. 프로젝트 및 블로그 상세에 `opengraph-image.tsx`를 적용한다.
5. 공통 OG JSX와 스타일은 재사용 가능한 서버 전용 모듈로 분리한다.
6. `?id=` 프로젝트 모달 URL은 `projects/page.tsx`에서 계속 처리하거나,
   장기적으로 독립 상세 URL과 Intercepting Routes 구조로 전환한다.

## 참고 자료

- [Next.js Metadata and OG images](https://nextjs.org/docs/app/getting-started/metadata-and-og-images)
- [Next.js `generateMetadata`](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Next.js `opengraph-image` and `twitter-image`](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image)
- [Next.js Metadata Files](https://nextjs.org/docs/app/api-reference/file-conventions/metadata)
- [Next.js Project Structure](https://nextjs.org/docs/app/getting-started/project-structure)
