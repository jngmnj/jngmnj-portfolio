import { useState } from 'react';
import Modal from '../common/Modal';
import ProjectCard from './ProjectCard';

// 프로젝트 데이터
const projects = [
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
  },
  {
    id: '3',
    title: '오즈코딩스쿨 통합교육 플랫폼(LMS)',
    description:
      'AI 기반 자동 응답 기능을 갖춘 통합 교육 플랫폼입니다. 강의 시청, 과제 제출, 실시간 질의응답 등 교육에 필요한 모든 기능을 제공합니다.',
    image: '/images/common/img_user.png', // 임시 이미지
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    githubUrl: 'https://github.com/OZ-Coding-School/oz_externship_fe_01_team2',
    category: 'Web Development',
  },
];

const ProjectList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');

  const openModal = (id: string) => {
    setSelectedProjectId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProjectId('');
  };

  return (
    <>
      {/* Projects Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            openModal={openModal}
          />
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal id={selectedProjectId} setIsModalOpen={closeModal} />
      )}
    </>
  );
};

export default ProjectList;
