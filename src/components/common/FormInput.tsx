import { cn } from '@/utils/style';
import { FieldErrors, FieldValues } from 'react-hook-form';

type FormInputProps = {
  label: string;
  id: string;
  register: (name: string, options?: { required?: boolean | string }) => object;
  errors: FieldErrors<FieldValues>;
  disabled: boolean;
  isLoading: boolean;
  type?: string;
  placeholder?: string;
  className?: string;
  required?: boolean | string;
};

const FormInput: React.FC<FormInputProps> = ({
  label,
  id,
  register,
  errors,
  disabled,
  isLoading,
  type = 'text',
  placeholder = '',
  className = '',
  required = true,
}) => {
  required = required ? `${label}을 입력해주세요.` : required;
  const hasError = !!errors[id];
  
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      <input
        id={id}
        disabled={disabled || isLoading}
        {...register(id, { required: required })}
        placeholder={placeholder}
        type={type}
        className={cn(
          `w-full border-b bg-transparent font-bold p-2 outline-none rounded-none transition-colors`,
          hasError
            ? 'border-red-500 focus:border-red-500'
            : 'border-gray-300 focus:border-gray-300',
          (disabled || isLoading) && 'cursor-not-allowed opacity-60',
          className
        )}
      />
      {hasError && (
        <p className="text-xs font-medium text-red-600">
          {String(errors[id]?.message || '오류가 발생했습니다.')}
        </p>
      )}
    </div>
  );
};

export default FormInput;
