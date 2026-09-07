'use client';

import { FirebaseProject } from '@/types';
import {
  getLocalizedList,
  getProjectDescription,
  getProjectOverview,
  getProjectTitle,
} from '@/utils/projectLocale';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
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

  const { i18n, t } = useTranslation('common');

  if (!project) return null;

  const title = getProjectTitle(project, i18n.language);
  const description = getProjectDescription(project, i18n.language);
  const overview = getProjectOverview(project, i18n.language);
  const features = getLocalizedList(
    project.detail?.features,
    project.detail?.featuresEn,
    i18n.language
  );
  const responsibilities = getLocalizedList(
    project.detail?.team?.responsibilities,
    project.detail?.team?.responsibilitiesEn,
    i18n.language
  );
  const challenges = getLocalizedList(
    project.detail?.challenges,
    project.detail?.challengesEn,
    i18n.language
  );
  const results = getLocalizedList(
    project.detail?.results,
    project.detail?.resultsEn,
    i18n.language
  );
  const role =
    i18n.language.startsWith('en') && project.detail?.team?.roleEn
      ? project.detail.team.roleEn
      : project.detail?.team?.role;

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
            className="fixed top-0 left-0 z-60 size-full cursor-pointer bg-gray-950/45 backdrop-blur-sm"
            onClick={handleBackdropClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <div className="fixed top-1/2 left-1/2 z-70 max-h-[92vh] w-[94vw] max-w-6xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl">
            <motion.div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              aria-describedby="modal-description"
              className="relative border border-gray-200 bg-white shadow-xl shadow-gray-950/10"
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button - 고정 */}
              <motion.button
                ref={closeButtonRef}
                className="focus-visible:ring-seagull-200 absolute top-4 right-4 z-10 inline-flex size-10 cursor-pointer items-center justify-center rounded-2xl bg-white/90 text-gray-500 shadow-sm ring-1 ring-gray-200 backdrop-blur transition-colors hover:bg-gray-50 hover:text-gray-900 focus-visible:ring-2 focus-visible:outline-none"
                onClick={closeModal}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={t('projects_modal.close')}
              >
                <RiCloseLine className="text-2xl" />
              </motion.button>

              {/* Project Content - 전체 스크롤 */}
              <div className="max-h-[92vh] overflow-y-auto">
                {/* Project Header */}
                <div className="relative m-2 h-72 overflow-hidden rounded-3xl sm:h-80">
                  <Image
                    src={project.image || '/images/common/img_user.png'}
                    alt={title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-gray-950/75 via-gray-950/20 to-transparent" />

                  {/* Project Title */}
                  <motion.div
                    className="absolute right-5 bottom-5 left-5 sm:right-8 sm:bottom-8 sm:left-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h1
                      id="modal-title"
                      className="mb-3 max-w-4xl text-3xl leading-tight font-semibold text-white sm:text-4xl"
                    >
                      {title}
                    </h1>
                    <div className="mb-3 flex items-center gap-2">
                      <span className="rounded-xl bg-white/15 px-3 py-1 text-xs font-semibold tracking-[0.08em] text-white/80 uppercase backdrop-blur">
                        {project.category}
                      </span>
                    </div>
                    <p
                      id="modal-description"
                      className="max-w-3xl text-base leading-relaxed text-white/85 sm:text-lg"
                    >
                      {description}
                    </p>
                  </motion.div>
                </div>

                {/* Project Content */}
                <div className="space-y-10 px-5 pt-6 pb-8 sm:px-8">
                  {/* Overview Section */}
                  {overview && (
                    <motion.div
                      className="rounded-3xl bg-gray-50 p-5 sm:p-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <h2 className="mb-3 text-xl font-semibold text-gray-950">
                        {t('projects_modal.overview')}
                      </h2>
                      <p className="text-base leading-8 text-gray-600">
                        {overview}
                      </p>
                    </motion.div>
                  )}

                  {/* Features Section */}
                  {features.length > 0 && (
                    <motion.div
                      className="rounded-3xl border border-gray-200 p-5 sm:p-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <h2 className="mb-4 text-xl font-semibold text-gray-950">
                        {t('projects_modal.features')}
                      </h2>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {features.map((feature, index) => (
                          <motion.div
                            key={index}
                            className="flex items-start gap-3 rounded-2xl bg-gray-50 px-4 py-3"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 + index * 0.1 }}
                          >
                            <div className="bg-seagull-500 mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />
                            <span
                              className="text-sm leading-6 text-gray-600"
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

                  <ProjectContributions
                    contributions={project.detail?.contributions}
                  />

                  {/* Tech Stack Section */}
                  <ProjectTechStack techStack={project.detail?.techStack} />

                  {/* Project Info Grid */}
                  {project.detail && (
                    <motion.div
                      className=""
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      <h2 className="mb-4 text-xl font-semibold text-gray-950">
                        {t('projects_modal.info')}
                      </h2>
                      <div className="grid gap-6 md:grid-cols-2">
                        {/* Timeline */}
                        <div className="rounded-3xl bg-gray-50 p-5">
                          <h3 className="mb-4 text-base font-semibold text-gray-950">
                            {t('projects_modal.timeline')}
                          </h3>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between gap-4">
                              <span className="text-sm text-gray-500">
                                {t('projects_modal.start')}
                              </span>
                              <span className="text-sm font-semibold text-gray-800">
                                {project.detail?.timeline?.startDate || '-'}
                              </span>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                              <span className="text-sm text-gray-500">
                                {t('projects_modal.end')}
                              </span>
                              <span className="text-sm font-semibold text-gray-800">
                                {project.detail?.timeline?.endDate || '-'}
                              </span>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                              <span className="text-sm text-gray-500">
                                {t('projects_modal.duration')}
                              </span>
                              <span className="text-sm font-semibold text-gray-800">
                                {project.detail?.timeline?.duration || '-'}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Team Info */}
                        <div className="rounded-3xl bg-gray-50 p-5">
                          <h3 className="mb-4 text-base font-semibold text-gray-950">
                            {t('projects_modal.team_info')}
                          </h3>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between gap-4">
                              <span className="text-sm text-gray-500">
                                {t('projects_modal.team_size')}:
                              </span>
                              <span className="text-sm font-semibold text-gray-800">
                                {project.detail?.team?.size || 1}{' '}
                                {t('projects_modal.team_unit')}
                              </span>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                              <span className="text-sm text-gray-500">
                                {t('projects_modal.role')}:
                              </span>
                              <span className="text-right text-sm font-semibold text-gray-800">
                                {role || '-'}
                              </span>
                            </div>
                          </div>
                          {responsibilities.length > 0 && (
                            <div className="mt-4 border-t border-gray-200 pt-4">
                              <h4 className="mb-2 text-sm font-semibold text-gray-700">
                                {t('projects_modal.responsibilities')}
                              </h4>
                              <ul className="space-y-2">
                                {responsibilities.map((resp, index) => (
                                  <li
                                    key={index}
                                    className="flex items-start gap-2 text-sm leading-6 text-gray-600"
                                  >
                                    <span className="bg-seagull-500 mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />
                                    {resp}
                                  </li>
                                ))}
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
                        className=""
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.85 }}
                      >
                        <h2 className="mb-4 text-xl font-semibold text-gray-950">
                          {t('projects_modal.images')}
                        </h2>
                        <ProjectImageSlider
                          images={project.detail.images}
                          projectTitle={title}
                          onImageClick={(index) => {
                            setSelectedImageIndex(index);
                            setImageViewerOpen(true);
                          }}
                        />
                      </motion.div>
                    )}

                  {/* Challenges & Results */}
                  {(challenges.length > 0 || results.length > 0) && (
                    <div className="grid gap-6 md:grid-cols-2">
                      {/* Challenges */}
                      {challenges.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.9 }}
                        >
                          <h2 className="mb-4 text-xl font-semibold text-gray-950">
                            {t('projects_modal.challenges')}
                          </h2>
                          <div className="space-y-2 rounded-3xl bg-gray-50 p-5">
                            {challenges.map((challenge, index) => (
                              <motion.div
                                key={index}
                                className="flex items-start gap-3 text-sm leading-6"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1.0 + index * 0.1 }}
                              >
                                <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" />
                                <span className="text-gray-600">
                                  {challenge}
                                </span>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {/* Results */}
                      {results.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.1 }}
                        >
                          <h2 className="mb-4 text-xl font-semibold text-gray-950">
                            {t('projects_modal.results')}
                          </h2>
                          <div className="space-y-2 rounded-3xl bg-gray-50 p-5">
                            {results.map((result, index) => (
                              <motion.div
                                key={index}
                                className="flex items-start gap-3 text-sm leading-6"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1.2 + index * 0.1 }}
                              >
                                <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green-400" />
                                <span className="text-gray-600">{result}</span>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  )}

                  {/* Project Links */}
                  <motion.div
                    className="flex flex-wrap gap-3 border-t border-gray-100 pt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3 }}
                  >
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center gap-2 rounded-2xl bg-gray-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800 focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:outline-none"
                    >
                      <FaGithub className="text-lg" />
                      <span>{t('projects_modal.github')}</span>
                    </a>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-seagull-500 hover:bg-seagull-600 focus-visible:ring-seagull-200 inline-flex min-h-11 items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold text-white transition-colors focus-visible:ring-2 focus-visible:outline-none"
                      >
                        <FaExternalLinkAlt className="text-lg" />
                        <span>{t('projects_modal.live')}</span>
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
          projectTitle={title}
          isOpen={imageViewerOpen}
          onClose={() => setImageViewerOpen(false)}
        />
      )}
    </>
  );
}
