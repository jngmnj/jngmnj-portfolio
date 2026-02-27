'use client';

import ProjectFormContributionsSection from '@/components/admin/project/ProjectFormContributionsSection';
import ProjectFormImageUpload from '@/components/admin/project/ProjectFormImageUpload';
import ProjectFormListSection from '@/components/admin/project/ProjectFormListSection';
import ProjectFormOverview from '@/components/admin/project/ProjectFormOverview';
import ProjectFormTeam from '@/components/admin/project/ProjectFormTeam';
import ProjectFormTechStackDetail from '@/components/admin/project/ProjectFormTechStackDetail';
import ProjectFormTimeline from '@/components/admin/project/ProjectFormTimeline';

export default function ProjectFormDetailInfo() {
  return (
    <div className="mt-8 border-t pt-6">
      <h3 className="mb-4 text-xl font-semibold">상세 정보</h3>

      <div className="space-y-4">
        <ProjectFormOverview />

        <ProjectFormTimeline />

        <ProjectFormTeam />

        <ProjectFormListSection
          label="Responsibilities"
          fieldPath="detail.team.responsibilities"
          placeholder="담당 업무 입력 후 Enter"
          chipClassName="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700"
          removeButtonClassName="ml-1 text-blue-700 hover:text-blue-900"
        />

        <ProjectFormListSection
          label="Features"
          fieldPath="detail.features"
          placeholder="기능 입력 후 Enter"
          chipClassName="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm text-green-700"
          removeButtonClassName="ml-1 text-green-700 hover:text-green-900"
        />

        <ProjectFormListSection
          label="Challenges"
          fieldPath="detail.challenges"
          placeholder="도전 과제 입력 후 Enter"
          chipClassName="inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-sm text-red-700"
          removeButtonClassName="ml-1 text-red-700 hover:text-red-900"
        />

        <ProjectFormListSection
          label="Results"
          fieldPath="detail.results"
          placeholder="결과 입력 후 Enter"
          chipClassName="inline-flex items-center gap-1 rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-700"
          removeButtonClassName="ml-1 text-purple-700 hover:text-purple-900"
        />

        <ProjectFormImageUpload
          label="상세 이미지 갤러리"
          fieldPath="detail.images"
          multiple
          maxFiles={10}
          placeholder="이미지 URL 입력 후 Enter"
        />

        <ProjectFormContributionsSection />

        <ProjectFormTechStackDetail />
      </div>
    </div>
  );
}
