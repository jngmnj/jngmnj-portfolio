'use client';

import Link from 'next/link';

interface Project {
  title: string;
  description: string;
  href: string;
  tags: string[];
}

export default function RecentProjectsSection() {
  const projects: Project[] = [
    {
      title: '포트폴리오 웹사이트',
      description:
        'Next.js와 Tailwind CSS를 사용하여 제작한 반응형 포트폴리오 웹사이트',
      href: 'https://github.com/jngmnj/jngmnj-portfolio',
      tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    },
    {
      title: '보드게임 플랫폼, 보드큐(Boardque)',
      description:
        '보드게임 입문자부터 마니아까지, 조건 기반 추천과 리뷰·평점을 통해 신뢰성 있는 보드게임 선택을 돕는 서비스',
      href: 'https://github.com/main-10-2team/boardgame-frontend',
      tags: ['Next.js', 'TypeScript', 'Tanstack Query'],
    },
    {
      title: '오즈코딩스쿨 통합교육 플랫폼(LMS)',
      description: 'AI 기반 자동 응답 기능을 갖춘 통합 교육 플랫폼(LMS)',
      href: 'https://github.com/OZ-Coding-School/oz_externship_fe_01_team2',
      tags: ['React', 'TypeScript', 'Tailwind CSS'],
    },
  ];

  return (
    <section className="mb-16">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-3xl font-bold">Recent Projects</h2>
        <Link
          href="/projects"
          className="text-seagull-600 hover:text-seagull-700"
        >
          View All →
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link
            key={project.title}
            href={project.href}
            target="_blank"
            className="group"
          >
            <div className="h-full cursor-pointer rounded-lg border border-gray-200 p-6 transition-all group-hover:shadow-md hover:border-gray-400">
              <h3 className="mb-2 text-xl font-semibold">{project.title}</h3>
              <p className="mb-4 text-gray-600">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded bg-gray-100 px-2 py-1 text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
