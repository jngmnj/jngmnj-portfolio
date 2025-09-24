export const HOME_OG_IMAGE_URL = '/images/common/og_image.png';
export const DEFAULT_TITLE = 'Jungmin Ji';
export const DEFAULT_DESCRIPTION =
  '프론트엔드 엔지니어 지정민의 포트폴리오입니다!';
export const SITE_URL = 'https://jngmnj.dev';
export const DEFAULT_NAME = '지정민';
export const DEFAULT_PICTURE = '/images/about/img_profile.png';
export const POSTS_PER_PAGE = 5;

// SEO Keywords
export const DEFAULT_KEYWORDS = [
  '프론트엔드',
  'Frontend',
  'React',
  'Next.js',
  'TypeScript',
  'JavaScript',
  '웹개발',
  'Web Development',
  '포트폴리오',
  'Portfolio',
  '지정민',
  'Jungmin Ji',
  '개발자',
  'Developer',
  'UI/UX',
  'Tailwind CSS',
  '웹디자인',
  'Web Design',
];

// Robots
export const ROBOTS_CONFIG = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    'max-video-preview': -1,
    'max-image-preview': 'large' as const,
    'max-snippet': -1,
  },
};
