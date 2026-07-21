'use client';

import Input from '@/components/common/Input';
import { useFormContext } from 'react-hook-form';
import { get } from 'react-hook-form';

interface FormFieldProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  validation?: object;
  className?: string;
  optional?: boolean;
  language?: 'ko' | 'en';
}

export default function FormField({
  name,
  label,
  type = 'text',
  placeholder,
  required = false,
  validation = {},
  className,
  optional = false,
  language = 'ko',
}: FormFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const rules = required
    ? { required: `${label}을 입력해주세요.`, ...validation }
    : validation;

  const error = get(errors, name);

  return (
    <div className={className}>
      <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-800">
        <span>{label}</span>
        {required && (
          <span className="text-xs font-medium text-red-600">필수</span>
        )}
        {optional && (
          <span className="text-xs font-medium text-gray-400">선택</span>
        )}
        {language === 'en' && (
          <span className="rounded-md bg-gray-100 px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-gray-500">
            EN
          </span>
        )}
      </label>
      <Input
        type={type}
        {...register(name, rules)}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        className="focus:border-seagull-500 focus:ring-seagull-100 min-h-11 focus:ring-2 focus:outline-none"
      />
      {error && (
        <p className="mt-1.5 text-xs font-medium text-red-600" role="alert">
          {String(error?.message)}
        </p>
      )}
    </div>
  );
}
