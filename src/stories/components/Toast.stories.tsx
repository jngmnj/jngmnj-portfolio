import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, waitFor } from 'storybook/test';
import Toast from '@/components/common/Toast';

const meta = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  args: {
    message: '변경사항을 저장했습니다.',
    type: 'success',
    duration: 60000,
    onClose: fn(),
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['success', 'error', 'info', 'warning'],
    },
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '화면 상단 중앙에 표시되며 기본 duration은 3000ms입니다. 이 갤러리는 확인하기 쉽도록 60초로 늘렸습니다. 종료 애니메이션 후 onClose가 호출되며 사용처에서 컴포넌트를 제거합니다.',
      },
    },
  },
} satisfies Meta<typeof Toast>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {};
export const Error: Story = {
  args: { type: 'error', message: '저장하지 못했습니다. 다시 시도해주세요.' },
};
export const Info: Story = {
  args: { type: 'info', message: '프로젝트 정보를 확인해주세요.' },
};
export const Warning: Story = {
  args: { type: 'warning', message: '변경사항이 아직 저장되지 않았습니다.' },
};
export const Dismiss: Story = {
  play: async ({ canvas, args }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Close toast' }));
    await waitFor(() => expect(args.onClose).toHaveBeenCalledOnce());
  },
};
export const AutoClose: Story = {
  args: { duration: 500 },
  play: async ({ args }) => {
    await waitFor(() => expect(args.onClose).toHaveBeenCalledOnce(), {
      timeout: 2000,
    });
  },
};
export const LongMessage: Story = {
  args: {
    message:
      '변경사항을 저장했습니다. 프로젝트의 상세 설명과 기술 스택을 다시 확인해주세요. Your project changes have been saved successfully.',
  },
  globals: { viewport: { value: 'mobile', isRotated: false } },
};
