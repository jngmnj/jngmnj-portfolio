import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent } from 'storybook/test';
import Button from '@/components/common/Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: '프로젝트 보기',
    color: 'primary',
    size: 'medium',
    onClick: fn(),
  },
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'linePrimary', 'secondary', 'danger'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'xlarge'],
    },
    href: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          '실제 공통 Button입니다. href가 있으면 Next.js Link로 렌더링됩니다. 로딩 전용 prop은 없으며 링크에 disabled나 button 이벤트를 전달하는 동작은 지원하지 않습니다.',
      },
    },
  },
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  play: async ({ canvas, args }) => {
    await userEvent.click(
      canvas.getByRole('button', { name: '프로젝트 보기' })
    );
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};
export const Outline: Story = { args: { color: 'linePrimary' } };
export const Secondary: Story = { args: { color: 'secondary' } };
export const Danger: Story = {
  args: { color: 'danger', children: '삭제하기' },
};
export const Small: Story = { args: { size: 'small' } };
export const Large: Story = { args: { size: 'large' } };
export const ExtraLarge: Story = { args: { size: 'xlarge' } };
export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvas, args }) => {
    const button = canvas.getByRole('button');
    await expect(button).toBeDisabled();
    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};
export const Link: Story = {
  args: { href: '/ko/projects' },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('link')).toHaveAttribute(
      'href',
      '/ko/projects'
    );
  },
};
export const LongLabel: Story = {
  args: {
    children:
      '프로젝트 상세 정보와 구현 과정 살펴보기 · Explore project details',
  },
  globals: { viewport: { value: 'mobile', isRotated: false } },
};
