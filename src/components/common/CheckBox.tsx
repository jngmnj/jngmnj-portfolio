import { cn } from '@/utils/style';
import { ComponentPropsWithoutRef, FC } from 'react';

type CheckboxProps = ComponentPropsWithoutRef<'input'>;

const Checkbox: FC<CheckboxProps> = ({ children, className, ...rest }) => {
  return (
    <label className="relative flex min-h-11 cursor-pointer items-center has-disabled:cursor-not-allowed">
      <input type="checkbox" {...rest} className="peer sr-only" />
      <span
        className={cn(
          'peer-checked:bg-seagull-500 peer-focus-visible:outline-seagull-600 flex size-5 shrink-0 items-center justify-center rounded-sm border border-gray-400 peer-checked:border-transparent peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-disabled:opacity-50',
          className
        )}
      >
        <svg
          aria-hidden="true"
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
      <span className="ml-2 min-w-0 text-gray-700 peer-disabled:opacity-50">
        {children}
      </span>
    </label>
  );
};

export default Checkbox;
