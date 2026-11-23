import type { ProjectSearchResult } from './projectSearch';

export function projectSearchKey(query: string, initialResult: ProjectSearchResult) {
  // initialData does not replace an existing cache entry. Scope it to the
  // server snapshot so a visibility change cannot revive the previous list.
  return ['project-search', query, initialResult] as const;
}
