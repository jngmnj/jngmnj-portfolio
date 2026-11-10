import ko from '@/locales/ko/common.json';
import en from '@/locales/en/common.json';
import { icons, type AboutTab } from '@/data/MyData';

export type AboutContent = { ko: AboutTab[]; en: AboutTab[] };
export const defaultAboutContent = {
  ko: ko.about.experience.tabs,
  en: en.about.experience.tabs,
} as AboutContent;
export const aboutTabNames = ['Career', 'Education', 'Skills', 'Profile'];

export function isAboutContent(value: unknown): value is AboutContent {
  if (!value || typeof value !== 'object') return false;
  const text = (v: unknown, required = false): v is string =>
    typeof v === 'string' && v.length <= 2000 && (!required || !!v.trim());
  const list = (v: unknown): v is string[] =>
    Array.isArray(v) && v.length <= 50 && v.every((x) => text(x));
  return ['ko', 'en'].every((locale) => {
    const tabs = (value as Record<string, unknown>)[locale];
    return (
      Array.isArray(tabs) &&
      tabs.length === 4 &&
      tabs.every((tab, index) => {
        if (
          !tab ||
          tab.id !== ['career', 'education', 'skills', 'profile'][index] ||
          !text(tab.name, true) ||
          !text(tab.description) ||
          !Array.isArray(tab.content) ||
          tab.content.length > 50
        )
          return false;
        return tab.content.every((row: Record<string, unknown>) => {
          if (!row || typeof row !== 'object') return false;
          if (index < 2)
            return (
              text(row.title, true) &&
              text(row.startDate, true) &&
              text(row.endDate, true) &&
              list(row.list)
            );
          if (index === 2)
            return (
              text(row.title, true) &&
              typeof row.icon === 'string' &&
              Object.hasOwn(icons, row.icon)
            );
          return text(row.label, true) && (text(row.value) || list(row.value));
        });
      })
    );
  });
}
