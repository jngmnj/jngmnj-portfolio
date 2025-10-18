'use client';

import ImageUploader from '@/components/blog/ImageUploader';
import Button from '@/components/common/Button';
import FormInput from '@/components/common/FormInput';
import Input from '@/components/common/Input';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface ProjectFormProps {
  editingProject?: any;
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
  const [formData, setFormData] = useState({
    title: editingProject?.title || '',
    description: editingProject?.description || '',
    image: editingProject?.image || '',
    technologies: editingProject?.technologies || [],
    githubUrl: editingProject?.githubUrl || '',
    liveUrl: editingProject?.liveUrl || '',
    category: editingProject?.category || 'Web Development',
  });

  const [techInput, setTechInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('image', formData.image);
      formDataToSend.append(
        'technologies',
        JSON.stringify(formData.technologies)
      );
      formDataToSend.append('githubUrl', formData.githubUrl);
      formDataToSend.append('liveUrl', formData.liveUrl);
      formDataToSend.append('category', formData.category);

      const response = await fetch('/api/projects/create', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        onSuccess();
        router.refresh();
      } else {
        alert('프로젝트 등록에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('프로젝트 등록 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const addTechnology = () => {
    if (techInput.trim()) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, techInput.trim()],
      });
      setTechInput('');
    }
  };

  const removeTechnology = (index: number) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h2 className="mb-6 text-2xl font-bold">
        {editingProject ? '프로젝트 수정' : '새 프로젝트'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          label="제목"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />

        <div>
          <label className="mb-2 block text-sm font-medium">설명</label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows={4}
            className="focus:border-seagull-500 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">이미지 URL</label>
          <div className="mb-2">
            <ImageUploader
              onImageUpload={(url) => setFormData({ ...formData, image: url })}
            />
          </div>
          <Input
            type="text"
            value={formData.image}
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.value })
            }
            placeholder="이미지 URL을 입력하거나 업로드하세요"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">기술 스택</label>
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
            {formData.technologies.map((tech, index) => (
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

        <FormInput
          label="GitHub URL"
          type="url"
          value={formData.githubUrl}
          onChange={(e) =>
            setFormData({ ...formData, githubUrl: e.target.value })
          }
          required
        />

        <FormInput
          label="Live URL (선택)"
          type="url"
          value={formData.liveUrl}
          onChange={(e) =>
            setFormData({ ...formData, liveUrl: e.target.value })
          }
        />

        <div>
          <label className="mb-2 block text-sm font-medium">카테고리</label>
          <select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="focus:border-seagull-500 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none"
            required
          >
            <option value="Web Development">Web Development</option>
            <option value="Mobile Development">Mobile Development</option>
            <option value="Desktop Application">Desktop Application</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="flex gap-4">
          <Button type="submit" disabled={loading}>
            {loading ? '등록 중...' : '등록'}
          </Button>
          <Button type="button" onClick={onCancel} variant="secondary">
            취소
          </Button>
        </div>
      </form>
    </div>
  );
}
