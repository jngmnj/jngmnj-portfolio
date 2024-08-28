import { cn } from '@/utils/style';
import { ComponentPropsWithoutRef, FC } from 'react';

type ButtonProps = ComponentPropsWithoutRef<'button'>;

const Button: FC<ButtonProps> = ({ children, className, ...rest }) => {
  return (
    <button
      className={cn(
        'bg-seagull-400 hover:bg-seagull-500 w-full rounded-md px-4 py-3 text-black transition-all',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
