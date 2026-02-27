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
    <div>
      <label className="mb-2 block text-sm font-medium">
        기술 스택 <span className="text-red-500">*</span>
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
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
          className="flex-1"
        />
        <Button
          type="button"
          onClick={addTechnology}
          className="w-full sm:w-auto"
        >
          추가
        </Button>
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {formData.technologies?.map((tech: string, index: number) => (
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
  );
}
