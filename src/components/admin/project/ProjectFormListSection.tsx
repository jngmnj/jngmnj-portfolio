'use client';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface ProjectFormListSectionProps {
  label: string;
  fieldPath: string; // e.g., 'detail.features', 'detail.team.responsibilities'
  placeholder?: string;
  chipClassName?: string;
  removeButtonClassName?: string;
}

export default function ProjectFormListSection({
  label,
  fieldPath,
  placeholder = '입력 후 Enter',
  chipClassName = 'inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700',
  removeButtonClassName = 'ml-1 text-gray-700 hover:text-gray-900',
}: ProjectFormListSectionProps) {
  const { watch, setValue } = useFormContext();
  const [inputValue, setInputValue] = useState('');
  const items = watch(fieldPath) || [];

  const handleAdd = () => {
    if (!inputValue.trim()) return;
    setValue(fieldPath, [...items, inputValue.trim()]);
    setInputValue('');
  };

  const handleRemove = (index: number) => {
    setValue(
      fieldPath,
      items.filter((_: string, i: number) => i !== index)
    );
  };

  return (
    <div>
      <label className="mb-2 block text-sm font-medium">{label}</label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder}
          className="flex-1"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAdd();
            }
          }}
        />
        <Button type="button" onClick={handleAdd} className="w-full sm:w-auto">
          추가
        </Button>
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {items.map((item: string, index: number) => (
          <span key={index} className={chipClassName}>
            {item}
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className={removeButtonClassName}
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
