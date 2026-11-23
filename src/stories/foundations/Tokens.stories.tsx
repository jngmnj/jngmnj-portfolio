import { useEffect, useRef, useState, type ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import {
  breakpoints,
  colorClasses,
  fontWeights,
  spacing,
  surfaces,
  typography,
} from './tokens';

function fontDetails(value: unknown): string {
  if (typeof value === 'string') return value;
  if (!Array.isArray(value)) return '';
  const [size, options] = value;
  const lineHeight =
    typeof options === 'string' ? options : (options?.lineHeight ?? 'normal');
  return `${size} · line-height ${lineHeight}`;
}

function Sheet({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mx-auto max-w-5xl space-y-8 p-2 sm:p-6">
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      {children}
    </section>
  );
}

function Swatch({ className }: { className: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState('');
  useEffect(() => {
    if (ref.current) setValue(getComputedStyle(ref.current).backgroundColor);
  }, []);
  return (
    <div className="min-w-0 space-y-2">
      <div
        ref={ref}
        data-swatch
        className={`h-20 rounded-xl border border-gray-200 ${className}`}
      />
      <p className="text-sm font-medium">{className.replace('bg-', '')}</p>
      <code className="block text-xs break-all text-gray-600">{value}</code>
    </div>
  );
}

const meta = {
  title: 'Foundations/Tokens',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'globals.css의 실제 색상과 Tailwind 기본 스케일을 표시합니다. 색상 값은 렌더링된 스타일에서 읽으며 별도 사본을 유지하지 않습니다. 재사용 가능한 목록은 foundations/tokens.ts에 있습니다.',
      },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Colors: Story = {
  render: () => (
    <Sheet title="색상 / Colors">
      {Object.entries(colorClasses).map(([name, classes]) => (
        <section key={name} className="space-y-4">
          <h2 className="text-lg font-semibold">{name}</h2>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-4 lg:grid-cols-6">
            {classes.map((className) => (
              <Swatch key={className} className={className} />
            ))}
          </div>
        </section>
      ))}
    </Sheet>
  ),
  play: async ({ canvasElement }) => {
    const swatches = canvasElement.querySelectorAll('[data-swatch]');
    await expect(swatches.length).toBe(24);
    for (const swatch of swatches) {
      await expect(getComputedStyle(swatch).backgroundColor).not.toBe(
        'rgba(0, 0, 0, 0)'
      );
    }
  },
};
export const Typography: Story = {
  render: () => (
    <Sheet title="글꼴 / Typography">
      <p className="text-gray-600">
        SUIT-Variable · 한글과 English를 함께 확인합니다. 크기와 행간은 Tailwind
        기본 스케일입니다.
      </p>
      <div className="divide-y divide-gray-200">
        {typography.map((token) => (
          <div key={token.name} className="space-y-3 py-5">
            <code className="text-xs text-gray-600">
              {token.className} · {fontDetails(token.value)}
            </code>
            <p className={token.className}>
              새로운 경험을 만드는 인터페이스
              <br />
              Design for clear communication.
            </p>
          </div>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {fontWeights.map((token) => (
          <p
            key={token.name}
            className={`rounded-xl border border-gray-200 p-4 ${token.className}`}
          >
            {token.name} {token.value} · 가독성과 Readability
          </p>
        ))}
      </div>
    </Sheet>
  ),
};
export const Spacing: Story = {
  render: () => (
    <Sheet title="간격 / Spacing">
      <p className="text-gray-600">
        컴포넌트 내부 간격은 2–4, 섹션과 카드 간격은 6–16 스케일을 참고하세요.
      </p>
      <div className="space-y-4">
        {spacing.map((token) => (
          <div
            key={token.name}
            className="grid grid-cols-[7rem_1fr] items-center gap-4"
          >
            <code className="text-sm">
              {token.name} · {token.value}
            </code>
            <div className={`bg-seagull-400 h-6 rounded ${token.className}`} />
          </div>
        ))}
      </div>
    </Sheet>
  ),
};
export const Surfaces: Story = {
  render: () => (
    <Sheet title="모서리와 그림자 / Surfaces">
      <p className="text-gray-600">
        둥근 모서리와 조용한 테두리를 우선하고 그림자는 필요한 곳에만
        사용합니다.
      </p>
      <div className="grid gap-6 sm:grid-cols-3">
        {surfaces.map((token) => (
          <div
            key={token.name}
            className={`flex min-h-32 items-center justify-center border border-gray-200 bg-white p-6 ${token.className}`}
          >
            <code className="text-sm">{token.name}</code>
          </div>
        ))}
      </div>
    </Sheet>
  ),
};
export const Breakpoints: Story = {
  render: () => (
    <Sheet title="반응형 기준 / Breakpoints">
      <p className="text-gray-600">
        Tailwind 기본 min-width 기준입니다. 상단 Viewport 도구에서
        모바일·태블릿·데스크톱을 전환하세요.
      </p>
      <dl className="grid gap-4 sm:grid-cols-3">
        {Object.entries(breakpoints).map(([name, value]) => (
          <div key={name} className="rounded-xl border border-gray-200 p-4">
            <dt className="font-semibold">{name}</dt>
            <dd className="mt-2 text-gray-600">{value}</dd>
          </div>
        ))}
      </dl>
    </Sheet>
  ),
};
