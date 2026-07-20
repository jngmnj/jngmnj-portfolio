'use client';

import { useFormContext, get } from 'react-hook-form';

interface FormTextareaProps {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  validation?: object;
  rows?: number;
  className?: string;
}

export default function FormTextarea({
  name,
  label,
  placeholder,
  required = false,
  validation = {},
  rows = 4,
  className,
}: FormTextareaProps) {
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
      <label className="mb-2 block text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        {...register(name, rules)}
        rows={rows}
        placeholder={placeholder}
        className="focus:border-seagull-500 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none"
      />
      {error && (
        <p className="mt-1 text-xs text-red-500">{String(error?.message)}</p>
      )}
    </div>
  );
}