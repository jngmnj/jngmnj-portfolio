import { cn } from '@/utils/style';
import { ComponentPropsWithoutRef, FC } from 'react';

type CheckboxProps = ComponentPropsWithoutRef<'input'>;

const Checkbox: FC<CheckboxProps> = ({ children, className, ...rest }) => {
  return (
    <label className="flex cursor-pointer items-center">
      <input type="checkbox" {...rest} className="peer hidden" />
      <span
        className={cn(
          'flex size-5 items-center justify-center rounded-sm border border-gray-400 peer-checked:border-transparent peer-checked:bg-seagull-500',
          className
        )}
      >
        <svg
          className="size-5 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </span>
      <span className="ml-2 text-gray-700">{children}</span>
    </label>
  );
};

export default Checkbox;
