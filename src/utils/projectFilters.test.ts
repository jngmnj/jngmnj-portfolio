import { describe, expect, it } from 'vitest';
import { projectFixtures } from '@/test/fixtures/projects';
import {
  filterProjects,
  getProjectFilterOptions,
  readProjectFilters,
  updateProjectQuery,
} from './projectFilters';
import { sortProjects } from './projectSort';

const filters = (query = '') => readProjectFilters(new URLSearchParams(query));
const ids = (query = '') =>
  filterProjects(projectFixtures, filters(query)).map((project) => project.id);

describe('project search and filters', () => {
  it('matches either language and technology case-insensitively', () => {
    expect(ids('q=  PORTFOLIO  ')).toEqual(['portfolio']);
    expect(ids('q=접근성')).toEqual(['portfolio']);
    expect(ids('q=visualization')).toEqual(['dashboard']);
    expect(ids('q=react')).toEqual(['portfolio', 'mobile']);
    expect(ids('q=여행')).toEqual(['mobile']);
  });
  it('ANDs groups while ORing selected technologies', () => {
    expect(ids('category=WEB&tech=react&tech=vue')).toEqual([
      'portfolio',
      'dashboard',
    ]);
    expect(ids('q=analytics&category=web&tech=react&tech=vue')).toEqual([
      'dashboard',
    ]);
    expect(ids('category=mobile&tech=react')).toEqual([]);
  });
  it('handles blank queries, no matches and unknown options', () => {
    expect(ids('q=  ')).toHaveLength(3);
    expect(ids('q=not-a-project')).toEqual([]);
    expect(ids('category=unknown')).toEqual([]);
    expect(ids('tech=unknown')).toEqual([]);
    expect(filterProjects([], filters())).toEqual([]);
  });
  it('normalizes, deduplicates and sorts options from the complete data', () => {
    const data = [
      ...projectFixtures,
      {
        ...projectFixtures[0],
        category: ' WEB ',
        technologies: [' react ', 'REACT', '', ' Vue '],
      },
    ];
    const options = getProjectFilterOptions(data, 'en');
    expect(options.categories).toEqual([
      { value: 'mobile', label: 'Mobile' },
      { value: 'web', label: 'Web' },
    ]);
    expect(
      options.technologies.filter((item) => item.value === 'react')
    ).toHaveLength(1);
    expect(options.technologies.some((item) => item.value === '')).toBe(false);
  });
  it('keeps the source unchanged and uses the existing sort after filtering', () => {
    const snapshot = JSON.stringify(projectFixtures);
    const results = filterProjects(projectFixtures, filters('category=web'));
    expect(
      sortProjects(results, 'oldest', 'en').map((item) => item.id)
    ).toEqual(['dashboard', 'portfolio']);
    expect(sortProjects(results, 'name', 'en').map((item) => item.id)).toEqual([
      'dashboard',
      'portfolio',
    ]);
    expect(JSON.stringify(projectFixtures)).toBe(snapshot);
  });
});

describe('URL updates', () => {
  it('resets only filters and preserves sort, modal and unrelated query', () => {
    const result = new URLSearchParams(
      updateProjectQuery(
        'q=hello&category=web&tech=react&sort=name&id=portfolio&utm_source=test',
        { q: '', category: '', tech: [] }
      )
    );
    expect(Object.fromEntries(result)).toEqual({
      sort: 'name',
      id: 'portfolio',
      utm_source: 'test',
    });
  });
  it('round trips Korean, special characters and multiple technologies', () => {
    const result = updateProjectQuery('', {
      q: ' 여행 & 앱 ',
      category: ' Web ',
      tech: [' React ', 'REACT', 'Vue', ''],
    });
    expect(filters(result)).toEqual({
      q: '여행 & 앱',
      category: 'web',
      tech: ['react', 'vue'],
    });
  });
  it('keeps filters when opening or closing a modal and changing sort', () => {
    const query = 'q=react&category=web&tech=react&tech=typescript&sort=name';
    const opened = updateProjectQuery(query, { id: 'portfolio' });
    expect(updateProjectQuery(opened, { id: null })).toBe(query);
    expect(
      new URLSearchParams(updateProjectQuery(query, { sort: 'latest' })).has(
        'sort'
      )
    ).toBe(false);
    expect(filters(updateProjectQuery(query, { sort: 'oldest' }))).toEqual(
      filters(query)
    );
  });
});
