/** @jsxImportSource @emotion/react */
import { cn } from '@/utils/style';
import { ComponentPropsWithoutRef, FC } from 'react';

type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  color?: string;
  size?: string;
  className?: string;
  children: React.ReactNode;
};

const Button: FC<ButtonProps> = ({
  color = 'primary',
  size = 'medium',
  children,
  className,
  ...rest
}: ButtonProps) => {
  // const tailwindClasses = `${buttonThemes.colors[color].className} ${buttonThemes.sizes[size].className} ${buttonThemes.common.className}`;
  // const hoverClasses = `${buttonThemes.colors[color].hoverClassName}`;

  const buttonClass = `btn-${color} btn-${size}`;

  return (
    <button className={cn(buttonClass, className)} {...rest}>
      {children}
    </button>
  );
};

export default Button;
