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
      if (current.includes(techStackInput.trim())) return;
      updateTechStack(techStackCategory, [...current, techStackInput.trim()]);
      setTechStackInput('');
    }
  };

  const removeTechStack = (category: TechStackCategory, index: number) => {
    const current = formData.detail?.techStack?.[category] || [];
    updateTechStack(
      category,
      current.filter((_: string, i: number) => i !== index)
    );
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-2 sm:grid-cols-[minmax(0,12rem)_1fr_auto]">
        <select
          value={techStackCategory}
          onChange={(e) =>
            setTechStackCategory(e.target.value as TechStackCategory)
          }
          aria-label="기술 카테고리"
          className="focus:border-seagull-500 focus:ring-seagull-100 min-h-11 w-full rounded-xl border border-gray-300 bg-white px-4 py-2 focus:ring-2 focus:outline-none"
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
          className="focus:border-seagull-500 focus:ring-seagull-100 min-h-11 flex-1 focus:ring-2 focus:outline-none"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addTechStack();
            }
          }}
        />
        <Button
          type="button"
          onClick={addTechStack}
          color="secondary"
          className="min-h-11 w-full sm:w-auto"
        >
          추가
        </Button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {TECH_STACK_CATEGORIES.map((category) => {
          const technologies =
            formData.detail?.techStack?.[category.value] || [];

          return (
            <div
              key={category.value}
              className={`min-h-24 rounded-xl border p-3 transition-colors ${
                techStackCategory === category.value
                  ? 'border-seagull-200 bg-seagull-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <button
                type="button"
                onClick={() => setTechStackCategory(category.value)}
                className="focus-visible:ring-seagull-300 mb-2 flex w-full items-center justify-between rounded-lg text-left focus-visible:ring-2 focus-visible:outline-none"
              >
                <span className="text-sm font-semibold text-gray-800">
                  {category.label}
                </span>
                <span className="rounded-full bg-white px-2 py-0.5 text-xs font-medium text-gray-500">
                  {technologies.length}
                </span>
              </button>
              {technologies.length === 0 ? (
                <p className="text-xs text-gray-400">등록된 기술 없음</p>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {technologies.map((tech: string, index: number) => (
                    <span
                      key={`${tech}-${index}`}
                      className="text-seagull-800 inline-flex max-w-full items-center gap-1 rounded-lg bg-white px-2.5 py-1 text-xs"
                    >
                      <span className="break-all">{tech}</span>
                      <button
                        type="button"
                        onClick={() => removeTechStack(category.value, index)}
                        className="hover:text-seagull-950 inline-flex size-5 shrink-0 items-center justify-center rounded-full"
                        aria-label={`${category.label}의 ${tech} 삭제`}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
