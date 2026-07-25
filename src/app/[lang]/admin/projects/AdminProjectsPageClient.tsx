'use client';

import ProjectForm from '@/components/admin/project/ProjectForm';
import ProjectList from '@/components/admin/project/ProjectList';
import { FirebaseProject } from '@/types';
import { useState } from 'react';

export default function AdminProjectsPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<FirebaseProject | null>(
    null
  );
  const [notice, setNotice] = useState<string | null>(null);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-seagull-700 mb-1 text-sm font-semibold">
            Portfolio Admin
          </p>
          <h1 className="text-2xl font-bold text-gray-950 sm:text-3xl">
            프로젝트 관리
          </h1>
          <p className="mt-2 text-sm leading-6 break-keep text-gray-500">
            포트폴리오에 노출할 프로젝트를 등록하고 관리합니다.
          </p>
        </div>
        <button
          onClick={() => {
            setEditingProject(null);
            setNotice(null);
            setShowForm(true);
          }}
          className="bg-seagull-500 hover:bg-seagull-600 focus-visible:ring-seagull-200 min-h-11 w-full rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-colors focus-visible:ring-2 focus-visible:outline-none sm:w-auto"
        >
          + 새 프로젝트
        </button>
      </div>

      {notice && !showForm && (
        <div
          role="status"
          className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium break-keep text-emerald-800"
        >
          {notice}
        </div>
      )}

      {showForm ? (
        <ProjectForm
          editingProject={editingProject}
          onCancel={() => {
            setShowForm(false);
            setEditingProject(null);
          }}
          onSuccess={() => {
            setNotice(
              editingProject
                ? '프로젝트를 수정했습니다.'
                : '새 프로젝트를 등록했습니다.'
            );
            setShowForm(false);
            setEditingProject(null);
          }}
        />
      ) : (
        <ProjectList
          onEdit={(project) => {
            setNotice(null);
            setEditingProject(project);
            setShowForm(true);
          }}
        />
      )}
    </div>
  );
}
