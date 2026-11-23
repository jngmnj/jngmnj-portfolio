import { describe, expect, it } from 'vitest';
import { searchProjects } from './projectSearch';
import { projectFixtures } from '@/test/fixtures/projects';

describe('server project search response', () => {
  it('excludes private projects from results, totals, options and detail links', () => {
    const privateProject = {
      ...projectFixtures[0],
      id: 'private',
      isPublic: false,
      category: 'private-only',
    };
    const result = searchProjects(
      [...projectFixtures, privateProject],
      new URLSearchParams('id=private'),
      'ko'
    );
    expect(result.total).toBe(projectFixtures.length);
    expect(result.projects.some((project) => project.id === 'private')).toBe(false);
    expect(result.selectedProject).toBeNull();
    expect(result.options.categories.map((option) => option.value)).not.toContain('private-only');
  });
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
