import { cn } from '@/utils/style';

type FormInputProps = {
  label: string;
  id: string;
  register: any;
  errors: any;
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
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        disabled={isLoading}
        {...register(id, { required: required })}
        placeholder={placeholder}
        type={type}
        className={cn(
          `w-full border-b bg-transparent p-2 outline-none ${errors[id] ? 'border-red-500' : 'border-gray-300'} ${errors[id] ? 'focus:border-red-500' : 'focus:border-gray-300'} rounded-none`,
          className
        )}
      />
      {errors[id] && (
        <p className="mt-1 text-xs text-red-500">{errors[id].message}</p>
      )}
    </>
  );
};

export default FormInput;
