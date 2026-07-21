'use client';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

export default function ProjectFormTechnologies() {
  const { watch, setValue } = useFormContext();
  const [techInput, setTechInput] = useState('');

  const formData = watch();

  const addTechnology = () => {
    if (techInput.trim()) {
      const currentTechs = formData.technologies || [];
      if (currentTechs.includes(techInput.trim())) return;
      setValue('technologies', [...currentTechs, techInput.trim()], {
        shouldDirty: true,
      });
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
    <div>
      <div className="mb-2 flex items-center gap-2">
        <label
          htmlFor="project-technologies"
          className="text-sm font-semibold text-gray-800"
        >
          대표 기술
        </label>
        <span className="text-xs font-medium text-red-600">필수</span>
      </div>
      <p className="mb-3 text-xs leading-5 break-keep text-gray-500">
        프로젝트 카드에 표시할 핵심 기술을 입력하고 Enter 또는 추가를 누르세요.
      </p>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Input
          id="project-technologies"
          type="text"
          value={techInput}
          onChange={(e) => setTechInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addTechnology();
            }
          }}
          placeholder="기술 스택 입력 후 Enter"
          className="focus:border-seagull-500 focus:ring-seagull-100 min-h-11 flex-1 focus:ring-2 focus:outline-none"
        />
        <Button
          type="button"
          onClick={addTechnology}
          color="secondary"
          className="min-h-11 w-full sm:w-auto"
        >
          추가
        </Button>
      </div>
      <div className="mt-3 flex min-h-7 flex-wrap gap-2" aria-live="polite">
        {formData.technologies?.map((tech: string, index: number) => (
          <span
            key={index}
            className="bg-seagull-100 text-seagull-700 inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm"
          >
            {tech}
            <button
              type="button"
              onClick={() => removeTechnology(index)}
              className="text-seagull-700 hover:text-seagull-900 focus-visible:ring-seagull-300 ml-1 inline-flex size-6 items-center justify-center rounded-full focus-visible:ring-2 focus-visible:outline-none"
              aria-label={`${tech} 삭제`}
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
