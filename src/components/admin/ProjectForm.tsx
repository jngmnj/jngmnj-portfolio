'use client';

import { PROJECT_CATEGORIES, TECH_STACK_CATEGORIES } from '@/app/lib/constants';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { FirebaseProject, TechStackCategory } from '@/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface ProjectFormProps {
  editingProject?: FirebaseProject | null;
  onCancel: () => void;
  onSuccess: () => void;
}

export default function ProjectForm({
  editingProject,
  onCancel,
  onSuccess,
}: ProjectFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [techInput, setTechInput] = useState('');
  const [responsibilityInput, setResponsibilityInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');
  const [challengeInput, setChallengeInput] = useState('');
  const [resultInput, setResultInput] = useState('');
  const [imageInput, setImageInput] = useState('');
  const [techStackCategory, setTechStackCategory] =
    useState<TechStackCategory>('frontend');
  const [techStackInput, setTechStackInput] = useState('');

  const {
    register,
    handleSubmit: handleFormSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: editingProject?.title || '',
      description: editingProject?.description || '',
      image: editingProject?.image || '',
      technologies: editingProject?.technologies || [],
      githubUrl: editingProject?.githubUrl || '',
      liveUrl: editingProject?.liveUrl || '',
      category: editingProject?.category || 'Web Development',
      // Detail fields
      detail: editingProject?.detail || {
        overview: '',
        features: [],
        images: [],
        techStack: {},
        timeline: {
          startDate: '',
          endDate: '',
          duration: '',
        },
        team: {
          size: 1,
          role: '',
          responsibilities: [],
        },
        contributions: [],
        challenges: [],
        results: [],
      },
    },
  });

  const formData = watch();

  // Helper function for techStack updates
  const updateTechStack = (category: TechStackCategory, value: string[]) => {
    const currentTechStack = formData.detail?.techStack || {};
    setValue('detail.techStack', {
      ...currentTechStack,
      [category]: value,
    });
  };

  const onSubmit = async (data: Partial<FirebaseProject>) => {
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', data.title || '');
      formDataToSend.append('description', data.description || '');
      formDataToSend.append('image', data.image || '');
      formDataToSend.append(
        'technologies',
        JSON.stringify(data.technologies || [])
      );
      formDataToSend.append('githubUrl', data.githubUrl || '');
      formDataToSend.append('liveUrl', data.liveUrl || '');
      formDataToSend.append('category', data.category || '');
      formDataToSend.append('detail', JSON.stringify(data.detail || {}));

      // 수정 모드일 때는 PUT, 생성 모드일 때는 POST
      const url = editingProject
        ? `/api/projects/${editingProject.id}`
        : '/api/projects/create';
      const method = editingProject ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: formDataToSend,
      });

      if (response.ok) {
        onSuccess();
        router.refresh();
      } else {
        alert(
          editingProject
            ? '프로젝트 수정에 실패했습니다.'
            : '프로젝트 등록에 실패했습니다.'
        );
      }
    } catch (error) {
      console.error('Error:', error);
      alert(
        editingProject
          ? '프로젝트 수정 중 오류가 발생했습니다.'
          : '프로젝트 등록 중 오류가 발생했습니다.'
      );
    } finally {
      setLoading(false);
    }
  };

  const addTechnology = () => {
    if (techInput.trim()) {
      const currentTechs = formData.technologies || [];
      setValue('technologies', [...currentTechs, techInput.trim()]);
      setTechInput('');
    }
  };

  const removeTechnology = (index: number) => {
    const currentTechs = formData.technologies || [];
    setValue(
      'technologies',
      currentTechs.filter((_: string, i: number) => i !== index)
    );
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h2 className="mb-6 text-2xl font-bold">
        {editingProject ? '프로젝트 수정' : '새 프로젝트'}
      </h2>

      <form onSubmit={handleFormSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium">
            제목 <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            {...register('title', { required: '제목을 입력해주세요.' })}
            placeholder="프로젝트 제목을 입력하세요"
          />
          {errors.title && (
            <p className="mt-1 text-xs text-red-500">
              {String(errors.title?.message)}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            설명 <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register('description', { required: '설명을 입력해주세요.' })}
            rows={4}
            className="focus:border-seagull-500 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none"
          />
          {errors.description && (
            <p className="mt-1 text-xs text-red-500">
              {String(errors.description?.message)}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            이미지 URL <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            {...register('image', { required: '이미지 URL을 입력해주세요.' })}
            placeholder="이미지 URL을 입력하세요"
          />
          {errors.image && (
            <p className="mt-1 text-xs text-red-500">
              {String(errors.image?.message)}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            기술 스택 <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2">
            <Input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addTechnology();
                }
              }}
              placeholder="기술 스택 입력 후 Enter"
            />
            <Button type="button" onClick={addTechnology}>
              추가
            </Button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.technologies.map((tech: string, index: number) => (
              <span
                key={index}
                className="bg-seagull-100 text-seagull-700 inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm"
              >
                {tech}
                <button
                  type="button"
                  onClick={() => removeTechnology(index)}
                  className="text-seagull-700 hover:text-seagull-900 ml-1"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            GitHub URL <span className="text-red-500">*</span>
          </label>
          <Input
            type="url"
            {...register('githubUrl', {
              required: 'GitHub URL을 입력해주세요.',
            })}
            placeholder="https://github.com/..."
          />
          {errors.githubUrl && (
            <p className="mt-1 text-xs text-red-500">
              {String(errors.githubUrl?.message)}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Live URL (선택)
          </label>
          <Input
            type="url"
            {...register('liveUrl')}
            placeholder="https://..."
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            카테고리 <span className="text-red-500">*</span>
          </label>
          <select
            {...register('category', { required: '카테고리를 선택해주세요.' })}
            className="focus:border-seagull-500 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none"
          >
            {PROJECT_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-xs text-red-500">
              {String(errors.category?.message)}
            </p>
          )}
        </div>

        {/* Detail Section */}
        <div className="mt-8 border-t pt-6">
          <h3 className="mb-4 text-xl font-semibold">상세 정보</h3>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium">Overview</label>
              <textarea
                {...register('detail.overview')}
                rows={3}
                className="focus:border-seagull-500 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none"
                placeholder="프로젝트 개요를 입력하세요"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Timeline</label>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="mb-1 block text-xs text-gray-600">
                    시작일
                  </label>
                  <Input
                    type="text"
                    {...register('detail.timeline.startDate')}
                    placeholder="2024.01"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-gray-600">
                    종료일
                  </label>
                  <Input
                    type="text"
                    {...register('detail.timeline.endDate')}
                    placeholder="2024.12"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-gray-600">
                    기간
                  </label>
                  <Input
                    type="text"
                    {...register('detail.timeline.duration')}
                    placeholder="12개월"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Team</label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs text-gray-600">
                    팀 크기
                  </label>
                  <Input
                    type="number"
                    {...register('detail.team.size', { valueAsNumber: true })}
                    placeholder="1"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-gray-600">
                    역할
                  </label>
                  <Input
                    type="text"
                    {...register('detail.team.role')}
                    placeholder="프론트엔드 개발자"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Responsibilities
              </label>
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={responsibilityInput}
                  onChange={(e) => setResponsibilityInput(e.target.value)}
                  placeholder="담당 업무 입력 후 Enter"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      if (responsibilityInput.trim()) {
                        const current =
                          formData.detail?.team?.responsibilities || [];
                        setValue('detail.team.responsibilities', [
                          ...current,
                          responsibilityInput.trim(),
                        ]);
                        setResponsibilityInput('');
                      }
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={() => {
                    if (responsibilityInput.trim()) {
                      const current =
                        formData.detail?.team?.responsibilities || [];
                      setValue('detail.team.responsibilities', [
                        ...current,
                        responsibilityInput.trim(),
                      ]);
                      setResponsibilityInput('');
                    }
                  }}
                >
                  추가
                </Button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.detail?.team?.responsibilities?.map(
                  (resp: string, index: number) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700"
                    >
                      {resp}
                      <button
                        type="button"
                        onClick={() => {
                          const current =
                            formData.detail?.team?.responsibilities || [];
                          setValue(
                            'detail.team.responsibilities',
                            current.filter(
                              (_: string, i: number) => i !== index
                            )
                          );
                        }}
                        className="ml-1 text-blue-700 hover:text-blue-900"
                      >
                        ×
                      </button>
                    </span>
                  )
                )}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Features</label>
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  placeholder="기능 입력 후 Enter"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      if (featureInput.trim()) {
                        const current = formData.detail?.features || [];
                        setValue('detail.features', [
                          ...current,
                          featureInput.trim(),
                        ]);
                        setFeatureInput('');
                      }
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={() => {
                    if (featureInput.trim()) {
                      const current = formData.detail?.features || [];
                      setValue('detail.features', [
                        ...current,
                        featureInput.trim(),
                      ]);
                      setFeatureInput('');
                    }
                  }}
                >
                  추가
                </Button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.detail?.features?.map(
                  (feature: string, index: number) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm text-green-700"
                    >
                      {feature}
                      <button
                        type="button"
                        onClick={() => {
                          const current = formData.detail?.features || [];
                          setValue(
                            'detail.features',
                            current.filter(
                              (_: string, i: number) => i !== index
                            )
                          );
                        }}
                        className="ml-1 text-green-700 hover:text-green-900"
                      >
                        ×
                      </button>
                    </span>
                  )
                )}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Challenges
              </label>
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={challengeInput}
                  onChange={(e) => setChallengeInput(e.target.value)}
                  placeholder="도전 과제 입력 후 Enter"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      if (challengeInput.trim()) {
                        const current = formData.detail?.challenges || [];
                        setValue('detail.challenges', [
                          ...current,
                          challengeInput.trim(),
                        ]);
                        setChallengeInput('');
                      }
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={() => {
                    if (challengeInput.trim()) {
                      const current = formData.detail?.challenges || [];
                      setValue('detail.challenges', [
                        ...current,
                        challengeInput.trim(),
                      ]);
                      setChallengeInput('');
                    }
                  }}
                >
                  추가
                </Button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.detail?.challenges?.map(
                  (challenge: string, index: number) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-sm text-red-700"
                    >
                      {challenge}
                      <button
                        type="button"
                        onClick={() => {
                          const current = formData.detail?.challenges || [];
                          setValue(
                            'detail.challenges',
                            current.filter(
                              (_: string, i: number) => i !== index
                            )
                          );
                        }}
                        className="ml-1 text-red-700 hover:text-red-900"
                      >
                        ×
                      </button>
                    </span>
                  )
                )}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Results</label>
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={resultInput}
                  onChange={(e) => setResultInput(e.target.value)}
                  placeholder="결과 입력 후 Enter"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      if (resultInput.trim()) {
                        const current = formData.detail?.results || [];
                        setValue('detail.results', [
                          ...current,
                          resultInput.trim(),
                        ]);
                        setResultInput('');
                      }
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={() => {
                    if (resultInput.trim()) {
                      const current = formData.detail?.results || [];
                      setValue('detail.results', [
                        ...current,
                        resultInput.trim(),
                      ]);
                      setResultInput('');
                    }
                  }}
                >
                  추가
                </Button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.detail?.results?.map(
                  (result: string, index: number) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-700"
                    >
                      {result}
                      <button
                        type="button"
                        onClick={() => {
                          const current = formData.detail?.results || [];
                          setValue(
                            'detail.results',
                            current.filter(
                              (_: string, i: number) => i !== index
                            )
                          );
                        }}
                        className="ml-1 text-purple-700 hover:text-purple-900"
                      >
                        ×
                      </button>
                    </span>
                  )
                )}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Images</label>
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={imageInput}
                  onChange={(e) => setImageInput(e.target.value)}
                  placeholder="이미지 URL 입력 후 Enter"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      if (imageInput.trim()) {
                        const current = formData.detail?.images || [];
                        setValue('detail.images', [
                          ...current,
                          imageInput.trim(),
                        ]);
                        setImageInput('');
                      }
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={() => {
                    if (imageInput.trim()) {
                      const current = formData.detail?.images || [];
                      setValue('detail.images', [
                        ...current,
                        imageInput.trim(),
                      ]);
                      setImageInput('');
                    }
                  }}
                >
                  추가
                </Button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.detail?.images?.map((img: string, index: number) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700"
                  >
                    {img}
                    <button
                      type="button"
                      onClick={() => {
                        const current = formData.detail?.images || [];
                        setValue(
                          'detail.images',
                          current.filter((_: string, i: number) => i !== index)
                        );
                      }}
                      className="ml-1 text-yellow-700 hover:text-yellow-900"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Tech Stack
              </label>
              <div className="flex gap-2">
                <select
                  value={techStackCategory}
                  onChange={(e) =>
                    setTechStackCategory(e.target.value as TechStackCategory)
                  }
                  className="focus:border-seagull-500 rounded-lg border border-gray-300 px-3 py-2 focus:outline-none"
                >
                  {TECH_STACK_CATEGORIES.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
                <Input
                  type="text"
                  value={techStackInput}
                  onChange={(e) => setTechStackInput(e.target.value)}
                  placeholder="기술 입력 후 Enter"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      if (techStackInput.trim()) {
                        const current =
                          formData.detail?.techStack?.[techStackCategory] || [];
                        updateTechStack(techStackCategory, [
                          ...current,
                          techStackInput.trim(),
                        ]);
                        setTechStackInput('');
                      }
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={() => {
                    if (techStackInput.trim()) {
                      const current =
                        formData.detail?.techStack?.[techStackCategory] || [];
                      updateTechStack(techStackCategory, [
                        ...current,
                        techStackInput.trim(),
                      ]);
                      setTechStackInput('');
                    }
                  }}
                >
                  추가
                </Button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.detail?.techStack?.[techStackCategory]?.map(
                  (tech: string, index: number) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 rounded-full bg-indigo-100 px-3 py-1 text-sm text-indigo-700"
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => {
                          const current =
                            formData.detail?.techStack?.[techStackCategory] ||
                            [];
                          updateTechStack(
                            techStackCategory,
                            current.filter(
                              (_: string, i: number) => i !== index
                            )
                          );
                        }}
                        className="ml-1 text-indigo-700 hover:text-indigo-900"
                      >
                        ×
                      </button>
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <Button type="submit" disabled={loading}>
            {loading
              ? editingProject
                ? '수정 중...'
                : '등록 중...'
              : editingProject
                ? '수정'
                : '등록'}
          </Button>
          <Button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 hover:bg-gray-600"
          >
            취소
          </Button>
        </div>
      </form>
    </div>
  );
}
