'use client';

import ProjectForm from '@/components/admin/ProjectForm';
import ProjectList from '@/components/admin/ProjectList';
import { useState } from 'react';

export default function AdminProjectsPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">프로젝트 관리</h1>
        <button
          onClick={() => {
            setEditingProject(null);
            setShowForm(true);
          }}
          className="bg-seagull-500 hover:bg-seagull-600 cursor-pointer rounded-lg px-6 py-2 text-white transition"
        >
          + 새 프로젝트
        </button>
      </div>

      {showForm ? (
        <ProjectForm
          editingProject={editingProject}
          onCancel={() => {
            setShowForm(false);
            setEditingProject(null);
          }}
          onSuccess={() => {
            setShowForm(false);
            setEditingProject(null);
          }}
        />
      ) : (
        <ProjectList
          onEdit={(project) => {
            setEditingProject(project);
            setShowForm(true);
          }}
        />
      )}
    </div>
  );
}
