import { useState, type ComponentProps } from 'react';
import { useForm } from 'react-hook-form';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent } from 'storybook/test';
import FormInput from '@/components/common/FormInput';
import Button from '@/components/common/Button';

function FormExample(args: ComponentProps<typeof FormInput>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [result, setResult] = useState('');
  return (
    <form
      noValidate
      onSubmit={handleSubmit((values) =>
        setResult(`저장됨: ${values[args.id]}`)
      )}
      className="w-full max-w-md space-y-4"
    >
      <FormInput
        {...args}
        register={register}
        errors={Object.keys(args.errors).length ? args.errors : errors}
      />
      <Button type="submit" disabled={args.disabled || args.isLoading}>
        확인
      </Button>
      <output className="block text-sm" aria-live="polite">
        {result}
      </output>
    </form>
  );
}

const meta = {
  title: 'Components/FormInput',
  component: FormInput,
  tags: ['autodocs'],
  args: {
    id: 'name',
    label: '이름',
    register: () => ({}),
    errors: {},
    disabled: false,
    isLoading: false,
    required: true,
    placeholder: '홍길동',
  },
  argTypes: { register: { control: false }, errors: { control: false } },
  render: (args) => <FormExample {...args} />,
  parameters: {
    docs: {
      description: {
        component:
          'react-hook-form의 register와 errors를 연결한 실제 폼입니다. required 기본값은 true이고 disabled 또는 isLoading이면 입력이 비활성화됩니다.',
      },
    },
  },
} satisfies Meta<typeof FormInput>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Required: Story = {
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole('button', { name: '확인' }));
    await expect(await canvas.findByText(/입력해주세요/)).toBeVisible();
    await userEvent.type(canvas.getByLabelText(/이름/), '홍길동');
    await userEvent.click(canvas.getByRole('button', { name: '확인' }));
    await expect(await canvas.findByText('저장됨: 홍길동')).toBeVisible();
  },
};
export const Optional: Story = {
  args: { required: false, label: '별명 (선택)' },
};
export const Error: Story = {
  args: {
    errors: { name: { type: 'required', message: '이름을 입력해주세요.' } },
  },
};
export const Disabled: Story = { args: { disabled: true } };
export const Loading: Story = { args: { isLoading: true } };
export const LongLabel: Story = {
  args: {
    label: '연락받을 이메일 주소 / Your preferred contact email',
    type: 'email',
    placeholder: 'hello@example.com',
  },
  globals: { viewport: { value: 'mobile', isRotated: false } },
};
