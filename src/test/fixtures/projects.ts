import type { FirebaseProject } from '@/types';

export const projectFixtures: FirebaseProject[] = [
  {
    id: 'portfolio',
    title: '포트폴리오',
    titleEn: 'Portfolio',
    description: '접근성을 고려한 웹 인터페이스',
    descriptionEn: 'An accessible web interface',
    category: 'Web',
    technologies: ['React', 'TypeScript'],
    image: '',
    githubUrl: '',
    createdAt: { seconds: 300, nanoseconds: 0 },
  },
  {
    id: 'dashboard',
    title: '분석 대시보드',
    titleEn: 'Data dashboard',
    description: '데이터 분석과 시각화',
    descriptionEn: 'Analytics and visualization',
    category: 'Web',
    technologies: ['Vue', 'TypeScript'],
    image: '',
    githubUrl: '',
    createdAt: { seconds: 200, nanoseconds: 0 },
  },
  {
    id: 'mobile',
    title: '여행 앱',
    description: '지도와 여행 정보를 보여주는 앱',
    category: 'Mobile',
    technologies: [
      'React Native',
      'TypeScript',
      'A-very-long-technology-name-for-responsive-layout',
    ],
    image: '',
    githubUrl: '',
    createdAt: { seconds: 100, nanoseconds: 0 },
  },
];
