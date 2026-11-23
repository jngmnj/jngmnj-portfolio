import { describe, expect, it } from 'vitest';
import { searchProjects } from './projectSearch';
import { projectFixtures } from '@/test/fixtures/projects';

describe('server project search response', () => {
  it('returns only matching results while keeping global options and totals', () => {
    const result = searchProjects(
      projectFixtures,
      new URLSearchParams('category=web&tech=vue&sort=name'),
      'en'
    );
    expect(result.projects.map((project) => project.id)).toEqual(['dashboard']);
    expect(result.total).toBe(3);
    expect(result.options.categories.map((option) => option.value)).toContain(
      'mobile'
    );
  });
  it('resolves a detail link independently of the search result', () => {
    const result = searchProjects(
      projectFixtures,
      new URLSearchParams('q=not-found&id=portfolio'),
      'ko'
    );
    expect(result.projects).toEqual([]);
    expect(result.selectedProject?.id).toBe('portfolio');
  });
});
