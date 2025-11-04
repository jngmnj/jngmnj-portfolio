# 이미지 업로더 사용 가이드

## 개요

이미지 업로더 컴포넌트는 Firebase Storage를 사용하여 이미지를 업로드, 관리, 삭제할 수 있는 재사용 가능한 컴포넌트입니다.

## 주요 기능

### ✅ 구현된 기능

1. **드래그 앤 드롭 지원**
   - 파일을 드래그하여 업로드 영역에 드롭
   - 드래그 중 시각적 피드백 제공

2. **파일 선택 버튼**
   - 클릭하여 파일 선택 다이얼로그 열기
   - 단일 또는 다중 파일 선택 지원

3. **이미지 미리보기**
   - 업로드된 이미지 썸네일 표시
   - Grid 레이아웃으로 깔끔한 정렬

4. **업로드 진행률 표시**
   - 각 파일별 업로드 진행률 표시
   - 프로그레스 바로 시각화

5. **이미지 삭제 기능**
   - 업로드된 이미지 개별 삭제
   - Firebase Storage에서도 자동 삭제

6. **파일 크기 제한**
   - 기본 5MB 제한 (설정 가능)
   - 업로드 전 클라이언트 측 검증

7. **파일 형식 검증**
   - 지원 형식: JPEG, PNG, WebP, GIF
   - 허용되지 않은 형식 업로드 차단

8. **다중 이미지 업로드**
   - 여러 이미지 동시 업로드
   - 최대 파일 개수 설정 가능

9. **이미지 순서 변경**
   - 화살표 버튼으로 이미지 순서 조정
   - 갤러리 이미지 순서 관리

## 컴포넌트 사용법

### 기본 사용 (단일 이미지)

```tsx
import ImageUploader from '@/components/common/ImageUploader';

function MyForm() {
  const [imageUrl, setImageUrl] = useState('');

  return (
    <ImageUploader
      value={imageUrl}
      onChange={(url) => setImageUrl(url as string)}
      label="썸네일 이미지"
      required
      multiple={false}
    />
  );
}
```

### 다중 이미지 업로드

```tsx
import ImageUploader from '@/components/common/ImageUploader';

function MyForm() {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  return (
    <ImageUploader
      value={imageUrls}
      onChange={(urls) => setImageUrls(urls as string[])}
      label="갤러리 이미지"
      multiple
      maxFiles={10}
    />
  );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string \| string[]` | - | 현재 이미지 URL(s) |
| `onChange` | `(urls: string \| string[]) => void` | - | 이미지 변경 핸들러 |
| `multiple` | `boolean` | `false` | 다중 업로드 허용 여부 |
| `maxFiles` | `number` | `5` | 최대 업로드 파일 개수 |
| `maxSizeMB` | `number` | `5` | 최대 파일 크기 (MB) |
| `acceptedFormats` | `string[]` | `['image/jpeg', 'image/png', 'image/webp', 'image/gif']` | 허용된 파일 형식 |
| `label` | `string` | `'이미지'` | 라벨 텍스트 |
| `required` | `boolean` | `false` | 필수 입력 여부 |
| `disabled` | `boolean` | `false` | 비활성화 여부 |

## API 엔드포인트

### POST /api/upload/image

이미지 파일을 업로드합니다.

**Request:**
```typescript
FormData {
  file: File,          // 업로드할 파일
  folder?: string      // 저장할 폴더 (기본값: 'images')
}
```

**Response:**
```typescript
{
  url: string,        // 업로드된 이미지 URL
  path: string,       // Firebase Storage 경로
  message: string     // 성공 메시지
}
```

### DELETE /api/upload/image

이미지를 삭제합니다.

**Query Parameters:**
- `filename`: 삭제할 파일의 경로

**Response:**
```typescript
{
  message: string     // 성공 메시지
}
```

## Firebase Storage 구조

```
firebase-storage/
├── images/          # 일반 이미지
├── projects/        # 프로젝트 관련 이미지
└── blog/           # 블로그 관련 이미지
```

각 파일명은 타임스탬프와 랜덤 문자열로 구성되어 중복을 방지합니다:
```
{timestamp}-{randomString}.{extension}
예: 1234567890-abc123d.jpg
```

## 보안 규칙

Firebase Storage 보안 규칙 (`storage.rules`):

- ✅ 모든 사용자: 읽기 가능
- ✅ 인증된 사용자: 업로드/삭제 가능
- ✅ 파일 형식 검증: jpeg, png, webp, gif만 허용
- ✅ 파일 크기 제한: 최대 5MB

보안 규칙을 Firebase에 배포하려면:
```bash
firebase deploy --only storage
```

## 테스트 가이드

### 1. 개발 환경 설정

```bash
# Firebase Storage 규칙 배포
firebase deploy --only storage

# 개발 서버 실행
npm run dev
```

### 2. 관리자 페이지 접속

```
http://localhost:3000/admin/projects
```

### 3. 테스트 시나리오

#### A. 썸네일 이미지 업로드 (단일)

1. "새 프로젝트" 버튼 클릭
2. 썸네일 이미지 영역에서:
   - ✅ 드래그 앤 드롭으로 이미지 업로드
   - ✅ 클릭하여 파일 선택
   - ✅ 진행률 표시 확인
   - ✅ 미리보기 확인
   - ✅ 삭제 버튼으로 이미지 제거

#### B. 갤러리 이미지 업로드 (다중)

1. 상세 정보 섹션에서 "상세 이미지 갤러리" 영역 찾기
2. 다음 기능 테스트:
   - ✅ 여러 이미지 동시 업로드
   - ✅ 최대 10개 제한 확인
   - ✅ 이미지 순서 변경 (좌우 화살표)
   - ✅ 개별 이미지 삭제

#### C. 유효성 검증 테스트

1. **파일 크기 제한**
   - 5MB 이상 파일 업로드 시도
   - 오류 메시지 확인

2. **파일 형식 제한**
   - PDF, TXT 등 이미지가 아닌 파일 업로드 시도
   - 오류 메시지 확인

3. **파일 개수 제한**
   - 갤러리에 10개 이상 업로드 시도
   - 오류 메시지 확인

#### D. 프로젝트 등록/수정

1. 모든 필드 입력 후 "등록" 버튼 클릭
2. 프로젝트 목록에서 이미지 정상 표시 확인
3. 프로젝트 수정 시 기존 이미지 유지 확인
4. 이미지 교체 기능 테스트

### 4. Firebase Storage 확인

1. Firebase Console 접속
2. Storage 메뉴에서 업로드된 이미지 확인
3. 파일 경로: `projects/{timestamp}-{random}.{ext}`
4. 이미지 삭제 시 Storage에서도 삭제 확인

## 알려진 제한사항

1. **인증 필요**: 이미지 업로드/삭제는 Firebase 인증된 사용자만 가능
2. **네트워크 의존**: 업로드 속도는 네트워크 환경에 따라 다름
3. **브라우저 지원**: 모던 브라우저(Chrome, Firefox, Safari, Edge)에서만 테스트됨

## 문제 해결

### 업로드가 실패하는 경우

1. Firebase Storage 규칙이 올바르게 배포되었는지 확인
2. 사용자가 Firebase Authentication으로 로그인되어 있는지 확인
3. 파일 크기와 형식이 제한 내에 있는지 확인
4. 브라우저 콘솔에서 에러 메시지 확인

### 이미지가 표시되지 않는 경우

1. Firebase Storage에 실제로 업로드되었는지 확인
2. CORS 설정이 올바른지 확인
3. 이미지 URL이 유효한지 확인

## 향후 개선 사항

- [ ] 이미지 압축/리사이징 기능
- [ ] 이미지 편집 기능 (크롭, 필터 등)
- [ ] 업로드 취소 기능
- [ ] 더 나은 에러 핸들링
- [ ] 접근성 개선
- [ ] 다크 모드 지원

## 참고 자료

- [Firebase Storage 문서](https://firebase.google.com/docs/storage)
- [Next.js Image 최적화](https://nextjs.org/docs/basic-features/image-optimization)
- [React Hook Form](https://react-hook-form.com/)

