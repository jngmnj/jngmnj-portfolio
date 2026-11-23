import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent } from 'storybook/test';
import Input from '@/components/common/Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-full max-w-md">
        <Story />
      </div>
    ),
  ],
  args: {
    'aria-label': '입력값',
    placeholder: '내용을 입력하세요',
    onChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        component:
          '네이티브 input 속성과 ref를 전달합니다. label은 사용처에서 제공해야 하며 에러 전용 prop은 없습니다. aria-invalid와 aria-describedby를 통해 에러 상태를 연결하세요.',
      },
    },
  },
} satisfies Meta<typeof Input>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  play: async ({ canvas, args }) => {
    const input = canvas.getByRole('textbox', { name: '입력값' });
    await userEvent.type(input, 'Hello 안녕하세요');
    await expect(input).toHaveValue('Hello 안녕하세요');
    await expect(args.onChange).toHaveBeenCalled();
  },
};
export const Email: Story = {
  args: { type: 'email', placeholder: 'hello@example.com' },
};
export const Password: Story = {
  args: { type: 'password', defaultValue: 'example-only' },
};
export const Number: Story = {
  args: { type: 'number', min: 0, max: 100, defaultValue: 10 },
};
export const Disabled: Story = {
  args: { disabled: true, defaultValue: '수정할 수 없는 값' },
};
export const ReadOnly: Story = {
  args: { readOnly: true, defaultValue: '읽기 전용' },
};
export const Error: Story = {
  args: {
    'aria-invalid': true,
    'aria-describedby': 'input-error',
    className: 'border-red-500',
  },
  render: (args) => (
    <div className="space-y-2">
      <Input {...args} />
      <p id="input-error" className="text-sm text-red-600">
        입력 내용을 확인해주세요.
      </p>
    </div>
  ),
};
export const LongPlaceholder: Story = {
  args: {
    placeholder:
      '프로젝트에 대해 자세히 알려주세요 / Tell us about your project',
  },
  globals: { viewport: { value: 'mobile', isRotated: false } },
};
