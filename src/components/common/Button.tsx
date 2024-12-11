/** @jsxImportSource @emotion/react */
import { cn } from '@/utils/style';
import { ComponentPropsWithoutRef, ElementType, FC } from 'react';

type ButtonProps<T extends ElementType = 'button'> = {
  as?: T; // 버튼 태그 변경을 위한 타입
  color?: string;
  size?: string;
  className?: string;
  children: React.ReactNode;
} & ComponentPropsWithoutRef<T>;

const Button: FC<ButtonProps> = ({
  as: Component = 'button',
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
    <Component className={cn(buttonClass, className)} {...rest}>
      {children}
    </Component>
  );
};

export default Button;
