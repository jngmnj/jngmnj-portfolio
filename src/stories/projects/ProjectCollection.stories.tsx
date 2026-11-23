import { useState } from 'react';
import { createInstance } from 'i18next';
import { I18nextProvider } from 'react-i18next';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fireEvent, userEvent, waitFor } from 'storybook/test';
import { ProjectCollection } from '@/components/projects/ProjectList';
import {
  updateProjectQuery,
  type ProjectQueryPatch,
} from '@/utils/projectFilters';
import { projectFixtures } from '@/test/fixtures/projects';
import type { FirebaseProject } from '@/types';
import ko from '@/locales/ko/common.json';
import en from '@/locales/en/common.json';

const translations = { ko, en };
const instances = Object.fromEntries(
  Object.entries(translations).map(([lng, common]) => {
    const instance = createInstance();
    void instance.init({
      lng,
      resources: { [lng]: { common } },
      defaultNS: 'common',
      initAsync: false,
      interpolation: { escapeValue: false },
    });
    return [lng, instance];
  })
);

function CollectionExample({
  initialQuery = '',
  locale = 'ko',
  projects = projectFixtures,
}: {
  initialQuery?: string;
  locale?: 'ko' | 'en';
  projects?: FirebaseProject[];
}) {
  const [query, setQuery] = useState(initialQuery);
  const change = (patch: ProjectQueryPatch) =>
    setQuery((current) => updateProjectQuery(current, patch));
  return (
    <I18nextProvider i18n={instances[locale]}>
      <div className="mx-auto max-w-6xl">
        <ProjectCollection
          projects={projects}
          query={query}
          locale={locale}
          onQueryChange={change}
        />
        <output hidden data-testid="project-query">
          {query}
        </output>
      </div>
    </I18nextProvider>
  );
}

const meta = {
  title: 'Projects/Search and filters',
  component: CollectionExample,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          '실제 프로젝트 목록과 검색·필터·모달을 가상 데이터로 검증합니다. URL 직렬화는 제품과 같은 함수를 사용하며 Next.js 내비게이션은 별도 브라우저 검사로 확인합니다.',
      },
    },
  },
  args: { locale: 'ko', initialQuery: '' },
} satisfies Meta<typeof CollectionExample>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const CombinedFilters: Story = {
  args: { initialQuery: 'sort=name' },
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole('button', { name: /검색·필터/ }));
    await userEvent.type(canvas.getByRole('searchbox'), 'TypeScript');
    await userEvent.selectOptions(canvas.getByLabelText('카테고리'), 'web');
    await userEvent.click(canvas.getByRole('checkbox', { name: 'Vue' }));
    await expect(canvas.getByRole('status')).toHaveTextContent(
      '전체 3개 중 1개'
    );
    await expect(
      canvas.getByRole('heading', { name: '분석 대시보드' })
    ).toBeVisible();
    await userEvent.click(canvas.getByRole('checkbox', { name: /^React$/ }));
    await expect(canvas.getByRole('status')).toHaveTextContent(
      '전체 3개 중 2개'
    );
    await userEvent.click(canvas.getByRole('button', { name: '초기화' }));
    await expect(canvas.getByRole('status')).toHaveTextContent(
      '전체 3개 중 3개'
    );
    await expect(canvas.getByLabelText('정렬')).toHaveValue('name');
    await expect(canvas.getByRole('searchbox')).toHaveValue('');
  },
};
export const NoResults: Story = {
  args: { initialQuery: 'q=not-a-project' },
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole('button', { name: /검색·필터/ }));
    await expect(
      canvas.getByRole('heading', { name: '조건에 맞는 프로젝트가 없습니다' })
    ).toBeVisible();
    await expect(canvas.getByRole('searchbox')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: '초기화' }));
    await expect(canvas.getByRole('status')).toHaveTextContent(
      '전체 3개 중 3개'
    );
  },
};
export const EmptyCollection: Story = {
  args: { projects: [] },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByText('아직 등록된 프로젝트가 없습니다.')
    ).toBeVisible();
    await expect(canvas.queryByRole('searchbox')).not.toBeInTheDocument();
  },
};
export const EnglishMobile: Story = {
  args: { locale: 'en' },
  globals: { viewport: { value: 'mobile', isRotated: false } },
};
export const KoreanComposition: Story = {
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole('button', { name: /검색·필터/ }));
    const input = canvas.getByRole('searchbox');
    await fireEvent.compositionStart(input);
    await fireEvent.input(input, {
      target: { value: '여' },
      isComposing: true,
    });
    await expect(canvas.getByRole('status')).toHaveTextContent(
      '전체 3개 중 3개'
    );
    await fireEvent.input(input, {
      target: { value: '여행' },
      isComposing: true,
    });
    await fireEvent.compositionEnd(input, { data: '여행' });
    await waitFor(() =>
      expect(canvas.getByRole('status')).toHaveTextContent('전체 3개 중 1개')
    );
    await expect(
      canvas.getByRole('heading', { name: '여행 앱' })
    ).toBeVisible();
  },
};
export const ModalPreservesQuery: Story = {
  args: {
    initialQuery: 'q=포트&category=web&tech=react&sort=name&source=test',
  },
  play: async ({ canvas }) => {
    await userEvent.click(
      canvas.getByRole('button', { name: '포트폴리오 자세히 보기' })
    );
    await expect(canvas.getByRole('dialog')).toBeVisible();
    await expect(canvas.getByTestId('project-query')).toHaveTextContent(
      'id=portfolio'
    );
    await userEvent.click(canvas.getByRole('button', { name: '모달 닫기' }));
    await expect(canvas.queryByRole('dialog')).not.toBeInTheDocument();
    const params = new URLSearchParams(
      canvas.getByTestId('project-query').textContent ?? ''
    );
    await expect(Object.fromEntries(params)).toEqual({
      q: '포트',
      category: 'web',
      tech: 'react',
      sort: 'name',
      source: 'test',
    });
  },
};
export const FilteredDeepLink: Story = {
  args: { initialQuery: 'q=no-results&id=portfolio' },
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole('button', { name: /검색·필터/ }));
    await expect(canvas.getByRole('dialog')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: '모달 닫기' }));
    await expect(
      canvas.getByRole('heading', { name: '조건에 맞는 프로젝트가 없습니다' })
    ).toBeVisible();
    await expect(canvas.getByRole('searchbox')).toHaveValue('no-results');
  },
};
