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
}

export default function FormField({
  name,
  label,
  type = 'text',
  placeholder,
  required = false,
  validation = {},
  className,
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
      <label className="mb-2 block text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <Input
        type={type}
        {...register(name, rules)}
        placeholder={placeholder}
      />
      {error && (
        <p className="mt-1 text-xs text-red-500">{String(error?.message)}</p>
      )}
    </div>
  );
}