'use client';

import ProjectFormContributionsSection from '@/components/admin/project/ProjectFormContributionsSection';
import ProjectFormImageUpload from '@/components/admin/project/ProjectFormImageUpload';
import ProjectFormListSection from '@/components/admin/project/ProjectFormListSection';
import ProjectFormOverview from '@/components/admin/project/ProjectFormOverview';
import ProjectFormSection from '@/components/admin/project/ProjectFormSection';
import ProjectFormTeam from '@/components/admin/project/ProjectFormTeam';
import ProjectFormTechStackDetail from '@/components/admin/project/ProjectFormTechStackDetail';
import ProjectFormTimeline from '@/components/admin/project/ProjectFormTimeline';

export default function ProjectFormDetailInfo() {
  return (
    <ProjectFormSection
      eyebrow="03 · Detail"
      title="상세 정보"
      description="프로젝트 상세 모달에서 보여줄 과정, 역할, 성과와 기술 정보를 입력합니다. 모든 항목은 선택 사항입니다."
    >
      <div className="space-y-8">
        <DetailGroup
          title="소개와 진행 정보"
          description="프로젝트 개요와 작업 기간, 팀 구성을 기록합니다."
        >
          <div className="space-y-6">
            <ProjectFormOverview />
            <ProjectFormTimeline />
            <ProjectFormTeam />
          </div>
        </DetailGroup>

        <DetailGroup
          title="역할과 프로젝트 내용"
          description="각 항목은 Enter 또는 추가 버튼으로 한 줄씩 등록합니다."
        >
          <div className="space-y-6">
            <ListFieldPair
              label="담당 업무"
              englishLabel="Responsibilities"
              fieldPath="detail.team.responsibilities"
              englishFieldPath="detail.team.responsibilitiesEn"
              placeholder="담당 업무 입력 후 Enter"
              englishPlaceholder="Enter a responsibility, then press Enter"
            />
            <ListFieldPair
              label="주요 기능"
              englishLabel="Features"
              fieldPath="detail.features"
              englishFieldPath="detail.featuresEn"
              placeholder="주요 기능 입력 후 Enter"
              englishPlaceholder="Enter a feature, then press Enter"
            />
            <ListFieldPair
              label="도전 과제"
              englishLabel="Challenges"
              fieldPath="detail.challenges"
              englishFieldPath="detail.challengesEn"
              placeholder="도전 과제 입력 후 Enter"
              englishPlaceholder="Enter a challenge, then press Enter"
            />
            <ListFieldPair
              label="성과"
              englishLabel="Results"
              fieldPath="detail.results"
              englishFieldPath="detail.resultsEn"
              placeholder="성과 입력 후 Enter"
              englishPlaceholder="Enter a result, then press Enter"
            />
          </div>
        </DetailGroup>

        <DetailGroup
          title="기여 내용"
          description="기여 주제 아래에 세부 내용과 관련 링크를 묶어 입력합니다."
        >
          <ProjectFormContributionsSection />
        </DetailGroup>

        <DetailGroup
          title="기술 스택 상세"
          description="카테고리별로 사용한 기술을 나누어 등록합니다."
        >
          <ProjectFormTechStackDetail />
        </DetailGroup>

        <DetailGroup
          title="상세 이미지"
          description="프로젝트 상세 화면에 표시할 이미지를 최대 10개까지 추가합니다."
        >
          <ProjectFormImageUpload
            label="이미지 갤러리"
            fieldPath="detail.images"
            multiple
            maxFiles={10}
            placeholder="이미지 URL 입력 후 Enter"
          />
        </DetailGroup>
      </div>
    </ProjectFormSection>
  );
}

interface DetailGroupProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

function DetailGroup({ title, description, children }: DetailGroupProps) {
  return (
    <div>
      <div className="mb-4">
        <h4 className="font-bold text-gray-900">{title}</h4>
        <p className="mt-1 text-sm leading-6 break-keep text-gray-500">
          {description}
        </p>
      </div>
      {children}
    </div>
  );
}

interface ListFieldPairProps {
  label: string;
  englishLabel: string;
  fieldPath: string;
  englishFieldPath: string;
  placeholder: string;
  englishPlaceholder: string;
}

function ListFieldPair({
  label,
  englishLabel,
  fieldPath,
  englishFieldPath,
  placeholder,
  englishPlaceholder,
}: ListFieldPairProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <ProjectFormListSection
        label={label}
        fieldPath={fieldPath}
        placeholder={placeholder}
      />
      <ProjectFormListSection
        label={englishLabel}
        fieldPath={englishFieldPath}
        placeholder={englishPlaceholder}
        language="en"
      />
    </div>
  );
}
