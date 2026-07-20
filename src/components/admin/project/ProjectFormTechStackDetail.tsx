'use client';

import { TECH_STACK_CATEGORIES } from '@/app/lib/constants';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { TechStackCategory } from '@/types';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

export default function ProjectFormTechStackDetail() {
  const { watch, setValue } = useFormContext();
  const [techStackCategory, setTechStackCategory] =
    useState<TechStackCategory>('frontend');
  const [techStackInput, setTechStackInput] = useState('');

  const formData = watch();

  // Helper function for techStack updates
  const updateTechStack = (category: TechStackCategory, value: string[]) => {
    const currentTechStack = formData.detail?.techStack || {};
    setValue('detail.techStack', {
      ...currentTechStack,
      [category]: value,
    });
  };

  const addTechStack = () => {
    if (techStackInput.trim()) {
      const current = formData.detail?.techStack?.[techStackCategory] || [];
      updateTechStack(techStackCategory, [...current, techStackInput.trim()]);
      setTechStackInput('');
    }
  };

  const removeTechStack = (index: number) => {
    const current = formData.detail?.techStack?.[techStackCategory] || [];
    updateTechStack(
      techStackCategory,
      current.filter((_: string, i: number) => i !== index)
    );
  };

  return (
    <div>
      <label className="mb-2 block text-sm font-medium">Tech Stack</label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <select
          value={techStackCategory}
          onChange={(e) =>
            setTechStackCategory(e.target.value as TechStackCategory)
          }
          className="focus:border-seagull-500 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none sm:w-auto"
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
          className="flex-1"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addTechStack();
            }
          }}
        />
        <Button
          type="button"
          onClick={addTechStack}
          className="w-full sm:w-auto"
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
                onClick={() => removeTechStack(index)}
                className="ml-1 text-indigo-700 hover:text-indigo-900"
              >
                ×
              </button>
            </span>
          )
        )}
      </div>
    </div>
  );
}
