/** @jsxImportSource @emotion/react */
import { cn } from '@/utils/style';
import Link from 'next/link';
import { ComponentPropsWithoutRef, ElementType, FC } from 'react';

type ButtonProps<T extends ElementType = 'button'> = {
  href?: string;
  color?: string;
  size?: string;
  className?: string;
  children: React.ReactNode;
} & ComponentPropsWithoutRef<T>;

const Button: FC<ButtonProps> = ({
  href = '',
  color = 'primary',
  size = 'medium',
  children,
  className,
  ...rest
}: ButtonProps) => {
  // const tailwindClasses = `${buttonThemes.colors[color].className} ${buttonThemes.sizes[size].className} ${buttonThemes.common.className}`;
  // const hoverClasses = `${buttonThemes.colors[color].hoverClassName}`;
  const buttonClass = `btn-${color} btn-${size}`;

  if (href) {
    return (
      <Link href={href} className={cn(buttonClass, className)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cn(buttonClass, className)} {...rest}>
      {children}
    </button>
  );
};

export default Button;
