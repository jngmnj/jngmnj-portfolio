import { FirebaseProject } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { RiCloseLine } from 'react-icons/ri';
import {
  useFocusTrap,
  useModalClose,
  useModalFocus,
  useScrollLock,
} from '../../utils/hooks';
import ImageViewerModal from './ImageViewerModal';
import ProjectContributions from './ProjectContributions';
import ProjectImageSlider from './ProjectImageSlider';
import ProjectTechStack from './ProjectTechStack';

interface ProjectDetailModalProps {
  project: FirebaseProject | null;
  closeModal: () => void;
}

export default function ProjectDetailModal({
  project,
  closeModal,
}: ProjectDetailModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [imageViewerOpen, setImageViewerOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // 모달이 열릴 때 body 스크롤 막기
  useScrollLock(true);

  // ESC 키 및 배경 클릭으로 모달 닫기
  const { handleBackdropClick } = useModalClose(true, closeModal);

  // 포커스 관리: 모달 열릴 때 닫기 버튼에 포커스, 닫힐 때 원래 포커스로 복원
  useModalFocus(closeButtonRef, true);

  // 포커스 트랩: Tab 키로 모달 내부만 순환
  useFocusTrap(modalRef, true);

  if (!project) return null;
  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={`modal-${project.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="fixed top-0 left-0 z-60 size-full cursor-pointer bg-black/50"
            onClick={handleBackdropClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <div className="fixed top-1/2 left-1/2 z-70 max-h-[95vh] w-[95vw] max-w-6xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl">
            <motion.div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              aria-describedby="modal-description"
              className="relative bg-white shadow-2xl"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button - 고정 */}
              <motion.button
                ref={closeButtonRef}
                className="absolute top-4 right-4 z-10 rounded-full bg-white/90 p-2 shadow-md transition-colors hover:bg-gray-100"
                onClick={closeModal}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="모달 닫기"
              >
                <RiCloseLine className="text-2xl" />
              </motion.button>

              {/* Project Content - 전체 스크롤 */}
              <div className="max-h-[95vh] overflow-y-auto">
                {/* Project Header */}
                <div className="relative h-80 w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

                  {/* Category Badge */}
                  <motion.div
                    className="absolute top-4 left-4"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="rounded-full bg-white/90 px-3 py-1 text-sm font-medium text-gray-700">
                      {project.category}
                    </span>
                  </motion.div>

                  {/* Project Title */}
                  <motion.div
                    className="absolute right-6 bottom-6 left-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h1
                      id="modal-title"
                      className="mb-2 text-3xl font-bold text-white"
                    >
                      {project.title}
                    </h1>
                    <p
                      id="modal-description"
                      className="text-lg leading-relaxed text-white/90"
                    >
                      {project.description}
                    </p>
                  </motion.div>
                </div>

                {/* Project Content */}
                <div className="p-8">
                  {/* Overview Section */}
                  {project.detail?.overview && (
                    <motion.div
                      className="mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <h2 className="mb-4 text-2xl font-bold text-gray-900">
                        프로젝트 개요
                      </h2>
                      <p className="text-lg leading-relaxed text-gray-600">
                        {project.detail.overview}
                      </p>
                    </motion.div>
                  )}

                  {/* Features Section */}
                  {project.detail?.features && (
                    <motion.div
                      className="mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <h2 className="mb-4 text-2xl font-bold text-gray-900">
                        주요 기능
                      </h2>
                      <div className="grid gap-3">
                        {project.detail.features.map((feature, index) => (
                          <motion.div
                            key={index}
                            className="flex items-start gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 + index * 0.1 }}
                          >
                            <div className="bg-seagull-500 mt-2 h-2 w-2 shrink-0 rounded-full" />
                            <span
                              className="text-gray-600"
                              dangerouslySetInnerHTML={{
                                __html: feature.replace(
                                  /\*\*(.*?)\*\*/g,
                                  '<strong>$1</strong>'
                                ),
                              }}
                            />
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Contributions Section */}
                  <ProjectContributions
                    contributions={project.detail?.contributions}
                  />

                  {/* Tech Stack Section */}
                  <ProjectTechStack techStack={project.detail?.techStack} />

                  {/* Project Info Grid */}
                  {project.detail && (
                    <motion.div
                      className="mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      <h2 className="mb-4 text-2xl font-bold text-gray-900">
                        프로젝트 정보
                      </h2>
                      <div className="grid gap-6 md:grid-cols-2">
                        {/* Timeline */}
                        <div className="rounded-lg bg-gray-50 p-4">
                          <h3 className="mb-3 font-semibold text-gray-900">
                            타임라인
                          </h3>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-600">시작일:</span>
                              <span className="font-medium">
                                {project.detail?.timeline?.startDate || '-'}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">종료일:</span>
                              <span className="font-medium">
                                {project.detail?.timeline?.endDate || '-'}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">기간:</span>
                              <span className="font-medium">
                                {project.detail?.timeline?.duration || '-'}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Team Info */}
                        <div className="rounded-lg bg-gray-50 p-4">
                          <h3 className="mb-3 font-semibold text-gray-900">
                            팀 정보
                          </h3>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-600">팀 규모:</span>
                              <span className="font-medium">
                                {project.detail?.team?.size || 1}명
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">역할:</span>
                              <span className="font-medium">
                                {project.detail?.team?.role || '-'}
                              </span>
                            </div>
                          </div>
                          {project.detail?.team?.responsibilities &&
                            project.detail.team.responsibilities.length > 0 && (
                              <div className="mt-3 border-t border-gray-200 pt-3">
                                <h4 className="mb-2 text-sm font-semibold text-gray-700">
                                  담당 업무
                                </h4>
                                <ul className="space-y-1">
                                  {project.detail.team.responsibilities.map(
                                    (resp, index) => (
                                      <li
                                        key={index}
                                        className="flex items-start gap-2 text-sm text-gray-600"
                                      >
                                        <span className="bg-seagull-500 mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" />
                                        {resp}
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            )}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Project Images Gallery */}
                  {project.detail?.images &&
                    project.detail.images.length > 0 && (
                      <motion.div
                        className="mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.85 }}
                      >
                        <h2 className="mb-4 text-2xl font-bold text-gray-900">
                          프로젝트 이미지
                        </h2>
                        <ProjectImageSlider
                          images={project.detail.images}
                          projectTitle={project.title}
                          onImageClick={(index) => {
                            setSelectedImageIndex(index);
                            setImageViewerOpen(true);
                          }}
                        />
                      </motion.div>
                    )}

                  {/* Challenges & Results */}
                  {project.detail && (
                    <div className="mb-8 grid gap-8 md:grid-cols-2">
                      {/* Challenges */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                      >
                        <h2 className="mb-4 text-2xl font-bold text-gray-900">
                          도전 과제
                        </h2>
                        <div className="space-y-3">
                          {project.detail.challenges.map((challenge, index) => (
                            <motion.div
                              key={index}
                              className="flex items-start gap-3"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 1.0 + index * 0.1 }}
                            >
                              <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-orange-500" />
                              <span className="text-gray-600">{challenge}</span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>

                      {/* Results */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.1 }}
                      >
                        <h2 className="mb-4 text-2xl font-bold text-gray-900">
                          성과
                        </h2>
                        <div className="space-y-3">
                          {project.detail.results.map((result, index) => (
                            <motion.div
                              key={index}
                              className="flex items-start gap-3"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 1.2 + index * 0.1 }}
                            >
                              <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-green-500" />
                              <span className="text-gray-600">{result}</span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  )}

                  {/* Project Links */}
                  <motion.div
                    className="flex flex-wrap gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3 }}
                  >
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-lg bg-gray-900 px-6 py-3 text-white transition-colors hover:bg-gray-800"
                    >
                      <FaGithub className="text-lg" />
                      <span>GitHub</span>
                    </a>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-seagull-500 hover:bg-seagull-600 flex items-center gap-2 rounded-lg px-6 py-3 text-white transition-colors"
                      >
                        <FaExternalLinkAlt className="text-lg" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Image Viewer Modal - AnimatePresence 밖에서 렌더링 */}
      {project.detail?.images && project.detail.images.length > 0 && (
        <ImageViewerModal
          images={project.detail.images}
          initialIndex={selectedImageIndex}
          projectTitle={project.title}
          isOpen={imageViewerOpen}
          onClose={() => setImageViewerOpen(false)}
        />
      )}
    </>
  );
}
