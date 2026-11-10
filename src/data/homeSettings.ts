export const homeSectionNames = {
  hero: '메인 소개',
  capability: '핵심 역량',
  about: '소개 요약',
  services: '제공 역량',
  career: '경력 요약',
  projects: '프로젝트',
  skills: '기술',
  process: '작업 과정',
  contact: '연락 안내',
} as const;
export type HomeSectionId = keyof typeof homeSectionNames;
export type HomeSettings = {
  sections: { id: HomeSectionId; enabled: boolean }[];
  projectMode: 'latest' | 'selected';
  projectIds: string[];
};
export const defaultHomeSettings: HomeSettings = {
  sections: (Object.keys(homeSectionNames) as HomeSectionId[]).map((id) => ({
    id,
    enabled: true,
  })),
  projectMode: 'latest',
  projectIds: [],
};
export function isHomeSettings(value: unknown): value is HomeSettings {
  if (!value || typeof value !== 'object') return false;
  const v = value as HomeSettings;
  return (
    Array.isArray(v.sections) &&
    v.sections.length === Object.keys(homeSectionNames).length &&
    new Set(v.sections.map((s) => s?.id)).size === v.sections.length &&
    v.sections.every(
      (s) =>
        s &&
        Object.hasOwn(homeSectionNames, s.id) &&
        typeof s.enabled === 'boolean'
    ) &&
    v.sections.some((s) => s.enabled) &&
    ['latest', 'selected'].includes(v.projectMode) &&
    Array.isArray(v.projectIds) &&
    v.projectIds.length <= 3 &&
    new Set(v.projectIds).size === v.projectIds.length &&
    v.projectIds.every(
      (id) => typeof id === 'string' && /^[a-zA-Z0-9_-]{1,150}$/.test(id)
    ) &&
    (v.projectMode !== 'selected' || v.projectIds.length > 0)
  );
}
