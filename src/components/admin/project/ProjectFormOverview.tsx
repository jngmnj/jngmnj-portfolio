'use client';

import FormTextarea from '@/components/admin/project/FormTextarea';

export default function ProjectFormOverview() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <FormTextarea
        name="detail.overview"
        label="프로젝트 개요"
        optional
        rows={4}
        placeholder="프로젝트의 배경과 목적을 입력하세요"
      />
      <FormTextarea
        name="detail.overviewEn"
        label="Project overview"
        optional
        language="en"
        rows={4}
        placeholder="Enter the project background and purpose"
      />
    </div>
  );
}
