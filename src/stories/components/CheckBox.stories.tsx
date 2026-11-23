import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent } from 'storybook/test';
import CheckBox from '@/components/common/CheckBox';

const meta = {
  title: 'Components/CheckBox',
  component: CheckBox,
  tags: ['autodocs'],
  args: { children: '개인정보 처리에 동의합니다', onChange: fn() },
  parameters: {
    docs: {
      description: {
        component:
          'children을 접근 가능한 레이블로 사용합니다. defaultChecked는 초기 선택 상태, checked와 onChange는 제어된 사용 방식입니다.',
      },
    },
  },
} satisfies Meta<typeof CheckBox>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Unchecked: Story = {
  play: async ({ canvas, args }) => {
    const checkbox = canvas.getByRole('checkbox', {
      name: '개인정보 처리에 동의합니다',
    });
    await userEvent.click(canvas.getByText('개인정보 처리에 동의합니다'));
    await expect(checkbox).toBeChecked();
    await expect(args.onChange).toHaveBeenCalledOnce();
  },
};
export const Checked: Story = { args: { defaultChecked: true } };
export const Disabled: Story = {
  args: { disabled: true, defaultChecked: true },
  play: async ({ canvas, args }) => {
    const checkbox = canvas.getByRole('checkbox');
    await expect(checkbox).toBeDisabled();
    await userEvent.click(canvas.getByText('개인정보 처리에 동의합니다'));
    await expect(checkbox).toBeChecked();
    await expect(args.onChange).not.toHaveBeenCalled();
  },
};
export const Keyboard: Story = {
  play: async ({ canvas }) => {
    const checkbox = canvas.getByRole('checkbox');
    checkbox.focus();
    await expect(checkbox).toHaveFocus();
    await userEvent.keyboard('[Space]');
    await expect(checkbox).toBeChecked();
  },
};
export const LongLabel: Story = {
  args: {
    children:
      '개인정보 처리방침과 서비스 이용약관을 읽고 동의합니다. I agree to the privacy policy and terms of service.',
  },
  globals: { viewport: { value: 'mobile', isRotated: false } },
};
