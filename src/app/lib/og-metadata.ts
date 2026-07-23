import { SITE_URL } from '@/app/lib/constants';
import { hasLocale, type Locale } from '@/constants/locales';
import type { Metadata } from 'next';

export type OgPage =
  | 'home'
  | 'about'
  | 'projects'
  | 'project'
  | 'blog'
  | 'post'
  | 'contact'
  | 'login'
  | 'register'
  | 'mypage'
  | 'admin';

type PageCopy = { title: string; description: string; label: string };

const pageCopy: Record<Locale, Record<OgPage, PageCopy>> = {
  ko: {
    home: {
      title: '지정민 | Frontend Engineer',
      description:
        '사용자 경험을 고민하며 제품을 만드는 프론트엔드 엔지니어 지정민입니다.',
      label: 'PORTFOLIO',
    },
    about: {
      title: '소개 | 지정민',
      description:
        '프론트엔드 엔지니어 지정민의 경험과 강점, 기술 역량을 소개합니다.',
      label: 'ABOUT',
    },
    projects: {
      title: '프로젝트 | 지정민',
      description: '직접 참여한 프로젝트와 문제 해결 과정을 소개합니다.',
      label: 'PROJECTS',
    },
    project: {
      title: '프로젝트 상세 | 지정민',
      description: '프로젝트에서 고민하고 구현한 과정과 결과를 확인해 보세요.',
      label: 'PROJECT',
    },
    blog: {
      title: '블로그 | 지정민',
      description: '개발 과정에서 배운 내용과 경험을 기록합니다.',
      label: 'BLOG',
    },
    post: {
      title: '블로그 글 | 지정민',
      description: '개발 과정에서 얻은 생각과 경험을 공유합니다.',
      label: 'ARTICLE',
    },
    contact: {
      title: '제안 및 문의 | 지정민',
      description: '프로젝트 제안이나 협업에 관한 이야기를 남겨 주세요.',
      label: 'CONTACT',
    },
    login: {
      title: '로그인 | 지정민',
      description: '지정민 포트폴리오 계정에 로그인합니다.',
      label: 'LOGIN',
    },
    register: {
      title: '회원가입 | 지정민',
      description: '지정민 포트폴리오 계정을 만듭니다.',
      label: 'REGISTER',
    },
    mypage: {
      title: '마이페이지 | 지정민',
      description: '내 계정 정보를 확인하고 관리합니다.',
      label: 'MY PAGE',
    },
    admin: {
      title: '관리자 | 지정민',
      description: '포트폴리오 콘텐츠 관리 페이지입니다.',
      label: 'ADMIN',
    },
  },
  en: {
    home: {
      title: 'Jungmin Ji | Frontend Engineer',
      description:
        'Frontend engineer building thoughtful products around the user experience.',
      label: 'PORTFOLIO',
    },
    about: {
      title: 'About | Jungmin Ji',
      description:
        'Explore my experience, strengths, and skills as a frontend engineer.',
      label: 'ABOUT',
    },
    projects: {
      title: 'Projects | Jungmin Ji',
      description:
        'A collection of projects and the problem-solving behind them.',
      label: 'PROJECTS',
    },
    project: {
      title: 'Project | Jungmin Ji',
      description:
        'See the decisions, implementation, and results behind this project.',
      label: 'PROJECT',
    },
    blog: {
      title: 'Blog | Jungmin Ji',
      description: 'Notes and lessons from building products for the web.',
      label: 'BLOG',
    },
    post: {
      title: 'Article | Jungmin Ji',
      description:
        'Thoughts and lessons learned throughout the development process.',
      label: 'ARTICLE',
    },
    contact: {
      title: 'Contact | Jungmin Ji',
      description: 'Get in touch about a project, role, or collaboration.',
      label: 'CONTACT',
    },
    login: {
      title: 'Log in | Jungmin Ji',
      description: 'Log in to your portfolio account.',
      label: 'LOGIN',
    },
    register: {
      title: 'Register | Jungmin Ji',
      description: 'Create your portfolio account.',
      label: 'REGISTER',
    },
    mypage: {
      title: 'My page | Jungmin Ji',
      description: 'Review and manage your account.',
      label: 'MY PAGE',
    },
    admin: {
      title: 'Admin | Jungmin Ji',
      description: 'Manage portfolio content.',
      label: 'ADMIN',
    },
  },
};

export function getOgPageCopy(lang: string, page: OgPage) {
  const locale: Locale = hasLocale(lang) ? lang : 'ko';
  return pageCopy[locale][page];
}

export function createPageMetadata({
  lang,
  page,
  path,
  title,
  description,
  imageParams,
}: {
  lang: string;
  page: OgPage;
  path: string;
  title?: string;
  description?: string;
  imageParams?: Record<string, string>;
}): Metadata {
  const locale: Locale = hasLocale(lang) ? lang : 'ko';
  const copy = getOgPageCopy(locale, page);
  const resolvedTitle = title || copy.title;
  const resolvedDescription = description || copy.description;
  const canonicalPath = `/${locale}${path}`;
  const image = new URL('/api/og', SITE_URL);
  image.searchParams.set('lang', locale);
  image.searchParams.set('page', page);
  Object.entries(imageParams ?? {}).forEach(([key, value]) => {
    image.searchParams.set(key, value);
  });

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    alternates: {
      canonical: canonicalPath,
      languages: {
        ko: `/ko${path}`,
        en: `/en${path}`,
      },
    },
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      url: canonicalPath,
      siteName: locale === 'ko' ? '지정민 포트폴리오' : 'Jungmin Ji Portfolio',
      images: [
        {
          url: image.toString(),
          width: 1200,
          height: 630,
          alt: resolvedTitle,
        },
      ],
      locale: locale === 'ko' ? 'ko_KR' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: resolvedTitle,
      description: resolvedDescription,
      images: [image.toString()],
    },
  };
}
