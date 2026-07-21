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
  language?: 'ko' | 'en';
}

export default function ProjectFormListSection({
  label,
  fieldPath,
  placeholder = '입력 후 Enter',
  chipClassName = 'inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700',
  removeButtonClassName = 'ml-1 text-gray-700 hover:text-gray-900',
  language = 'ko',
}: ProjectFormListSectionProps) {
  const { watch, setValue } = useFormContext();
  const [inputValue, setInputValue] = useState('');
  const items = watch(fieldPath) || [];

  const handleAdd = () => {
    if (!inputValue.trim()) return;
    if (items.includes(inputValue.trim())) return;
    setValue(fieldPath, [...items, inputValue.trim()], { shouldDirty: true });
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
      <div className="mb-2 flex items-center gap-2">
        <label className="text-sm font-semibold text-gray-800">{label}</label>
        <span className="text-xs font-medium text-gray-400">선택</span>
        {language === 'en' && (
          <span className="rounded-md bg-gray-100 px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-gray-500">
            EN
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder}
          className="focus:border-seagull-500 focus:ring-seagull-100 min-h-11 flex-1 focus:ring-2 focus:outline-none"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAdd();
            }
          }}
        />
        <Button
          type="button"
          onClick={handleAdd}
          color="secondary"
          className="min-h-11 w-full sm:w-auto"
        >
          추가
        </Button>
      </div>
      <div className="mt-3 flex min-h-7 flex-wrap gap-2" aria-live="polite">
        {items.map((item: string, index: number) => (
          <span key={index} className={`${chipClassName} max-w-full`}>
            <span className="break-all">{item}</span>
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className={removeButtonClassName}
              aria-label={`${item} 삭제`}
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
