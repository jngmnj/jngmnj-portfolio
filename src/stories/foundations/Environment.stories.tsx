import styled from '@emotion/styled';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import Button from '@/components/common/Button';

const EmotionSample = styled.p({ color: 'rgb(65, 78, 110)' });

const meta = {
  title: 'Foundations/Environment',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '앱의 globals.css, Tailwind 테마, 로컬 SUIT 폰트, Emotion 및 Next.js Link를 동일한 프리뷰에서 확인합니다.',
      },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Integration: Story = {
  render: () => (
    <section className="max-w-xl space-y-6 rounded-2xl border border-gray-200 bg-white p-6">
      <div>
        <h1 className="text-2xl font-bold">
          함께 만드는 인터페이스 / Interface
        </h1>
        <p className="mt-2 text-gray-600">
          SUIT · Tailwind CSS · Emotion · Next.js
        </p>
      </div>
      <EmotionSample>Emotion 스타일이 적용된 문장</EmotionSample>
      <Button href="/ko/projects">프로젝트 둘러보기</Button>
    </section>
  ),
  play: async ({ canvas }) => {
    const link = canvas.getByRole('link', { name: '프로젝트 둘러보기' });
    await expect(link).toHaveAttribute('href', '/ko/projects');
    await expect(getComputedStyle(link).backgroundColor).toBe(
      'rgb(75, 212, 255)'
    );
    await expect(
      getComputedStyle(canvas.getByText('Emotion 스타일이 적용된 문장')).color
    ).toBe('rgb(65, 78, 110)');
    const fonts = await document.fonts.load('16px "SUIT-Variable"');
    await expect(fonts.length).toBeGreaterThan(0);
    await expect(getComputedStyle(document.body).fontFamily).toContain(
      'SUIT-Variable'
    );
  },
};
