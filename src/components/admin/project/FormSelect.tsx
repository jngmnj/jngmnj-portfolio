'use client';

import { useFormContext, get } from 'react-hook-form';

interface FormSelectProps {
  name: string;
  label: string;
  options: Array<{ value: string; label: string }> | string[];
  required?: boolean;
  validation?: object;
  className?: string;
}

export default function FormSelect({
  name,
  label,
  options,
  required = false,
  validation = {},
  className,
}: FormSelectProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const rules = required
    ? { required: `${label}을 선택해주세요.`, ...validation }
    : validation;

  const error = get(errors, name);

  return (
    <div className={className}>
      <label className="mb-2 block text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        {...register(name, rules)}
        className="focus:border-seagull-500 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none"
      >
        {options.map((option) => {
          const value = typeof option === 'string' ? option : option.value;
          const label = typeof option === 'string' ? option : option.label;
          return (
            <option key={value} value={value}>
              {label}
            </option>
          );
        })}
      </select>
      {error && (
        <p className="mt-1 text-xs text-red-500">{String(error?.message)}</p>
      )}
    </div>
  );
}