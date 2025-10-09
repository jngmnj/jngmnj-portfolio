export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  category: string;
  detail?: {
    overview: string;
    features: string[];
    images: string[];
    techStack: {
      frontend?: string[];
      styling?: string[];
      deployment?: string[];
      tools?: string[];
      stateManagement?: string[];
      backend?: string[];
      realtime?: string[];
      ai?: string[];
      optimization?: string[];
    };
    timeline: {
      startDate: string;
      endDate: string;
      duration: string;
    };
    team: {
      size: number;
      role: string;
      responsibilities: string[];
    };
    contributions?: {
      title: string;
      details: {
        text: string;
        link?: string;
        linkText?: string;
      }[];
    }[];
    challenges: string[];
    results: string[];
  };
}

export const projects: Project[] = [
  {
    id: '1',
    title: '포트폴리오 웹사이트',
    description:
      'Next.js와 Tailwind CSS를 사용하여 제작한 반응형 포트폴리오 웹사이트입니다. 개발자로서의 경험과 프로젝트를 체계적으로 정리하여 보여줍니다.',
    image: '/images/common/img_user.png', // 임시 이미지
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    githubUrl: 'https://github.com/jngmnj/jngmnj-portfolio',
    liveUrl: 'https://jngmnj.dev',
    category: 'Web Development',
    // 상세 목업 데이터
    detail: {
      overview:
        '개인 포트폴리오 웹사이트로, 개발자의 기술 스택, 프로젝트 경험, 그리고 개인 정보를 체계적으로 보여주는 웹 애플리케이션입니다.',
      features: [
        '반응형 디자인으로 모든 디바이스에서 최적화된 사용자 경험',
        '다크/라이트 모드 지원',
        '프로젝트 상세 정보 모달',
        '블로그 기능 (마크다운 지원)',
        '관리자 페이지를 통한 콘텐츠 관리',
        'SEO 최적화 및 메타 태그 관리',
      ],
      images: [
        '/images/common/img_user.png',
        '/images/common/img_user.png',
        '/images/common/img_user.png',
      ],
      techStack: {
        frontend: ['Next.js 14', 'React 18', 'TypeScript', 'Tailwind CSS'],
        styling: ['Tailwind CSS', 'Framer Motion', 'React Icons'],
        deployment: ['Vercel', 'Firebase Hosting'],
        tools: ['ESLint', 'Prettier', 'Git', 'Figma'],
      },
      timeline: {
        startDate: '2024.01',
        endDate: '2024.12',
        duration: '12개월',
      },
      team: {
        size: 1,
        role: '풀스택 개발자',
        responsibilities: [
          'UI/UX 디자인',
          '프론트엔드 개발',
          '백엔드 API 설계',
          '배포 및 운영',
        ],
      },
      challenges: [
        'SEO 최적화를 위한 메타 태그 및 구조화된 데이터 구현',
        '다양한 디바이스에서의 반응형 디자인 최적화',
        '성능 최적화를 위한 이미지 및 코드 스플리팅',
        '접근성(a11y) 표준 준수',
      ],
      results: [
        '페이지 로딩 속도 3초 이내 달성',
        '모바일 사용자 경험 점수 95점 이상',
        'SEO 점수 90점 이상 달성',
        '다양한 브라우저에서의 호환성 확보',
      ],
    },
  },
  {
    id: '2',
    title: '보드게임 플랫폼, 보드큐(Boardque)',
    description:
      '보드게임 입문자부터 마니아까지, 조건 기반 추천과 리뷰·평점을 통해 신뢰성 있는 보드게임 선택을 돕는 서비스입니다.',
    image: '/images/common/img_user.png', // 임시 이미지
    technologies: ['Next.js', 'TypeScript', 'Tanstack Query'],
    githubUrl: 'https://github.com/main-10-2team/boardgame-frontend',
    category: 'Web Development',
    // 상세 목업 데이터
    detail: {
      overview:
        '보드게임 입문자부터 마니아까지, 조건 기반 추천과 리뷰·평점을 통해 신뢰성 있는 보드게임 선택을 돕는 서비스입니다. AI 기반 추천 시스템과 커뮤니티 기능을 통해 사용자 맞춤형 보드게임 탐색 경험을 제공합니다.',
      features: [
        '**실시간 검색 시스템**: debounce(300ms) 적용으로 최적화된 검색 경험',
        '**반응형 디자인**: 모든 디바이스에서 일관된 사용자 경험',
        '**무한 스크롤**: IntersectionObserver 기반으로 부드러운 탐색',
        '**다중 필터링**: 카테고리, 장르, 난이도, 플레이 시간 등 세밀한 필터',
        '**좋아요 시스템**: Optimistic UI로 즉각적인 피드백',
        '**리뷰 CRUD**: 모달 기반 작성/수정으로 페이지 이탈 방지',
        '**유튜브 연동**: 게임별 가이드 영상 자동 임베드',
        '**URL 상태 관리**: 쿼리 파라미터로 공유 및 재방문 시 상태 유지',
      ],
      images: [
        '/images/common/img_user.png',
        '/images/common/img_user.png',
        '/images/common/img_user.png',
      ],
      techStack: {
        frontend: ['Next.js 14', 'React 18', 'TypeScript', 'Tailwind CSS'],
        stateManagement: ['Tanstack Query', 'Zustand'],
        styling: ['Tailwind CSS', 'Framer Motion', 'React Icons'],
        backend: ['Node.js', 'Express', 'MongoDB'],
        deployment: ['Vercel', 'Railway'],
        optimization: ['IntersectionObserver', 'Debounce', 'Skeleton UI'],
      },
      timeline: {
        startDate: '2024.06',
        endDate: '2024.10',
        duration: '5개월',
      },
      team: {
        size: 4,
        role: '프론트엔드 개발자',
        responsibilities: [
          'API 명세 검증 및 백엔드 협업 프로세스 개선 주도',
          '도메인별 기능 우선순위 수립 및 작업 현황 트래킹 체계 구축',
          '전 페이지 반응형 구현 및 디자인 시스템 준수',
          '재사용 가능한 공통 컴포넌트 설계로 유지보수 효율성 확보',
        ],
      },
      contributions: [
        {
          title: 'SearchOverlay 컴포넌트 개발',
          details: [
            {
              text: '실시간 검색 최적화: debounce(300ms) 적용으로 불필요한 네트워크 요청 최소화',
              link: 'https://github.com/main-10-2team/boardgame-frontend/blob/main/src/components/SearchOverlay.tsx',
              linkText: 'SearchOverlay.tsx',
            },
            {
              text: '최대 6개 결과 제한 및 로딩/에러 상태 처리로 안정적인 사용자 경험 제공',
            },
            {
              text: '검색 결과 클릭 시 오버레이 자동 닫기 처리로 자연스러운 전환 경험 구현',
            },
            {
              text: 'form 태그 도입 → Enter 입력 시 /games?keyword= 쿼리로 이동, 검색 흐름 개선',
            },
          ],
        },
        {
          title: 'API 프록시 및 필터 확장',
          details: [
            {
              text: 'Next.js API Route(/api/games)를 통해 외부 API 요청 프록시 → CORS 문제 해결',
              link: 'https://github.com/main-10-2team/boardgame-frontend/blob/main/src/app/api/games/route.ts',
              linkText: 'API Route',
            },
            {
              text: 'IntersectionObserver로 무한 스크롤 구현 및 중복 데이터 제거 로직 적용',
              link: 'https://github.com/main-10-2team/boardgame-frontend/blob/main/src/hooks/useInfiniteScroll.ts',
              linkText: 'useInfiniteScroll Hook',
            },
            {
              text: '검색 상태에 따라 "검색어 없음 / 로딩 중 / 결과 없음" UI 분기 처리',
            },
          ],
        },
        {
          title: '게임 리스트 페이지 고도화',
          details: [
            {
              text: 'GameList 페이지를 mock 기반 UI작업 후 API 연동 구조로 전환',
              link: 'https://github.com/main-10-2team/boardgame-frontend/blob/main/src/components/GameList.tsx',
              linkText: 'GameList.tsx',
            },
            {
              text: 'UI 단위 컴포넌트 분리 및 타입 정의로 유지보수성과 확장성 향상',
            },
            {
              text: '카테고리, 장르, 난이도, 플레이 시간 등 다중 조건 필터링 지원',
              link: 'https://github.com/main-10-2team/boardgame-frontend/blob/main/src/components/FilterSidebar.tsx',
              linkText: 'FilterSidebar.tsx',
            },
            {
              text: 'URL 쿼리 파라미터와 연동하여 공유·재방문 시 상태 일관성 유지',
            },
            {
              text: 'useInfiniteQuery + IntersectionObserver 기반 무한 스크롤 구현',
            },
            {
              text: 'GameList/FilterSidebar에 Skeleton UI 도입으로 로딩 체감 개선 및 CLS 안정화',
              link: 'https://github.com/main-10-2team/boardgame-frontend/blob/main/src/components/Skeleton.tsx',
              linkText: 'Skeleton.tsx',
            },
          ],
        },
        {
          title: '게임 상세 페이지 리팩토링',
          details: [
            {
              text: '목데이터 제거 후 /games/:id API 연동',
            },
            {
              text: 'RSC 기반으로 리팩토링하여 초기 로딩 성능 및 SEO 개선',
              link: 'https://github.com/main-10-2team/boardgame-frontend/blob/main/src/app/games/[id]/page.tsx',
              linkText: 'Game Detail Page',
            },
            {
              text: '상세 UI를 의미별 컴포넌트로 분리 (Top/Bottom/Header/Info 등)',
            },
            {
              text: '좋아요 기능에 Optimistic UI와 롤백 처리를 적용으로 사용자 경험 개선',
              link: 'https://github.com/main-10-2team/boardgame-frontend/blob/main/src/hooks/useLike.ts',
              linkText: 'useLike Hook',
            },
            {
              text: '게임 제목 기반 가이드 영상을 React Query로 불러와 상세 페이지에 임베드',
            },
            {
              text: 'SimilarGameList를 CSR 컴포넌트로 전환, TanStack Query 기반 연동',
            },
            {
              text: 'SEO 개선: 동적 메타데이터 적용으로 검색 친화적인 페이지 제목/설명 반영',
            },
          ],
        },
        {
          title: '리뷰 UI 및 CRUD 기능 구현',
          details: [
            {
              text: '무한 스크롤로 긴 리뷰 목록도 자연스럽게 탐색 가능',
            },
            {
              text: '리뷰 없는 경우 graceful fallback으로 빈 상태를 친절하게 안내',
            },
            {
              text: '작성/수정 시 모달을 활용해 페이지 이탈 없이 인터랙션 가능',
              link: 'https://github.com/main-10-2team/boardgame-frontend/blob/main/src/components/ReviewModal.tsx',
              linkText: 'ReviewModal.tsx',
            },
            {
              text: '에러 발생 시에도 기존 UI는 그대로 유지',
            },
            {
              text: '쿼리 invalidate로 리뷰 작성/수정 후 자동 갱신 → 리뷰어/사용자가 새로고침 없이 결과 확인 가능',
            },
            {
              text: 'useReviewMutation 훅을 도입해 create/update 로직 분리 → 코드 가독성/재사용성 강화',
              link: 'https://github.com/main-10-2team/boardgame-frontend/blob/main/src/hooks/useReviewMutation.ts',
              linkText: 'useReviewMutation Hook',
            },
          ],
        },
      ],
      challenges: [
        '대용량 보드게임 데이터의 효율적인 관리 및 검색 최적화',
        '복잡한 필터링 조건에 따른 추천 알고리즘 구현',
        '실시간 검색과 무한 스크롤의 성능 최적화',
        '다양한 디바이스에서의 일관된 반응형 디자인 구현',
        'API 프록시를 통한 CORS 문제 해결 및 데이터 일관성 유지',
        'Optimistic UI 구현 시 에러 처리 및 롤백 로직 설계',
      ],
      results: [
        '월 활성 사용자 1,000명 달성',
        '평균 페이지 로딩 시간 2.5초 이내',
        '사용자 만족도 4.5/5.0',
        '추천 정확도 85% 이상',
        '검색 응답 시간 300ms 이내',
        '무한 스크롤 성능 최적화로 부드러운 사용자 경험 제공',
        '반응형 디자인으로 모바일 사용자 만족도 향상',
      ],
    },
  },
  {
    id: '3',
    title: '오즈코딩스쿨 통합교육 플랫폼(LMS)',
    description:
      '수강생 간의 활발한 소통을 촉진하고, 학습 효율을 극대화하기 위한 AI 기반 자동 응답 기능을 갖춘 통합 교육 플랫폼(LMS) 개발.',
    image: '/images/common/img_user.png', // 임시 이미지
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    githubUrl: 'https://github.com/OZ-Coding-School/oz_externship_fe_01_team2',
    category: 'Web Development',
    // 상세 목업 데이터
    detail: {
      overview:
        '수강생 간의 활발한 소통을 촉진하고, 학습 효율을 극대화하기 위한 AI 기반 자동 응답 기능을 갖춘 통합 교육 플랫폼(LMS) 개발. 이 프로젝트의 핵심 목표는 단순한 질의응답을 넘어, 질문 등록부터 답변 채택까지 이어지는 사용자 친화적인 흐름을 구축하고, AI가 학습 과정을 돕는 혁신적인 학습 환경을 제공합니다.',
      features: [
        '**AI 기반 자동 질의응답 시스템**: OpenAI Chat Completions API 연동',
        '**실시간 AI 챗봇**: 스트리밍 응답 처리 및 메시지 렌더링',
        '**질문/답변 페이지**: Markdown 뷰어를 통한 컨텐츠 렌더링',
        '**답변 채택/등록 시스템**: 사용자 친화적인 인터랙션',
        '**댓글 시스템**: 질문과 답변에 대한 추가 피드백',
        '**공통 컴포넌트**: 재사용 가능한 UI 컴포넌트 설계',
        '**AWS S3+CloudFront 배포**: 안정적인 정적 호스팅',
        '**CI/CD 파이프라인**: GitHub Actions 기반 자동 배포',
      ],
      images: [
        '/images/common/img_user.png',
        '/images/common/img_user.png',
        '/images/common/img_user.png',
      ],
      techStack: {
        frontend: ['React 18', 'TypeScript', 'Tailwind CSS', 'Redux Toolkit'],
        ai: ['OpenAI API', 'Chat Completions API'],
        styling: ['Tailwind CSS', 'Markdown Viewer', 'React Icons'],
        deployment: ['AWS S3', 'CloudFront', 'GitHub Actions'],
        tools: ['ESLint', 'Prettier', 'Git'],
      },
      timeline: {
        startDate: '2024.03',
        endDate: '2024.08',
        duration: '6개월',
      },
      team: {
        size: 6,
        role: '팀장 & 프론트엔드 개발자',
        responsibilities: [
          '프로젝트 전반의 개발 환경 및 배포 환경 구축',
          '공통 컴포넌트 개발 및 Tailwind CSS 설정',
          '질의응답 UI 구현 및 API 연동',
          'AI 기능 연동 및 챗봇 개발',
        ],
      },
      contributions: [
        {
          title: '협업 & 공통',
          details: [
            {
              text: '팀장으로써 프로젝트 전반의 개발 환경, 배포 환경을 구축하고 공통컴포넌트를 개발',
            },
            {
              text: '공통 컴포넌트 및 Tailwind CSS: 재사용 가능한 공통 컴포넌트를 설계하고 Tailwind CSS 설정을 구축하여 개발 생산성을 높임',
            },
            {
              text: 'AWS S3+CloudFront 배포',
            },
            {
              text: 'CI/CD Github Actions 설정',
            },
          ],
        },
        {
          title: '질의응답 UI구현, API 연동',
          details: [
            {
              text: '질문/답변 페이지 개발',
            },
            {
              text: 'Markdown 뷰어를 구현하여 컨텐츠를 렌더링하는 질문 상세 조회 페이지 구현',
            },
            {
              text: '상세페이지에서 답변등록, 댓글등록 UI구현',
            },
            {
              text: '질문 상세/목록 조회 기능 구현',
            },
            {
              text: '답변 채택/등록 및 댓글 등록 기능 구현',
            },
          ],
        },
        {
          title: 'AI 기능 연동',
          details: [
            {
              text: 'AI 답변 생성 UI 구현: 질문에 대한 AI 자동 답변 생성 기능을 위한 UI를 개발하고, OpenAI Chat Completions API 연동',
            },
            {
              text: '후속 질문 입력 및 자동 스크롤 처리',
            },
            {
              text: '실시간 답변 누적 및 Markdown 렌더링',
            },
            {
              text: 'AI 챗봇 개발: 실시간 대화형 AI 챗봇 인터페이스를 구현하고, 챗봇 API 연동을 완료하여 학습자가 즉각적인 질의응답을 할 수 있는 환경 구축',
            },
            {
              text: '실시간 응답 스트리밍 처리 및 메시지 렌더링',
            },
            {
              text: '챗봇 열기/닫기 버튼 및 메시지 자동 스크롤 처리',
            },
            {
              text: '메시지 입력창 및 전송 UI 구현',
            },
          ],
        },
      ],
      challenges: [
        'AI API 연동 시 실시간 스트리밍 응답 처리 최적화',
        'Markdown 뷰어 구현 및 컨텐츠 렌더링 성능 개선',
        '대화형 챗봇 UI/UX 설계 및 사용자 경험 최적화',
        'AWS S3+CloudFront 배포 환경 구축 및 CI/CD 파이프라인 설정',
        '공통 컴포넌트 설계로 개발 생산성 향상',
        '팀 프로젝트 관리 및 협업 프로세스 개선',
      ],
      results: [
        'AI 답변 생성 시간 3초 이내 달성',
        '실시간 챗봇 응답률 95% 이상',
        'Markdown 렌더링 성능 최적화로 부드러운 사용자 경험 제공',
        'AWS S3+CloudFront로 안정적인 배포 환경 구축',
        'GitHub Actions CI/CD로 자동 배포 프로세스 완성',
        '공통 컴포넌트 재사용으로 개발 생산성 30% 향상',
        '팀 프로젝트 성공적 완료 및 사용자 만족도 4.8/5.0',
      ],
    },
  },
];
