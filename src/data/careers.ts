import ko from '@/locales/ko/common.json';
import en from '@/locales/en/common.json';

export type Career = {
  id: string;
  company: string;
  companyEn: string;
  title: string;
  titleEn: string;
  startDate: string;
  endDate: string;
};

export const defaultCareers: Career[] = ko.about.experience.tabs[0].content.map(
  (item, index) => {
    const english = en.about.experience.tabs[0].content[index];
    return {
      id: `career-${index}`,
      company: 'list' in item ? item.list[0] : '',
      companyEn: 'list' in english ? english.list[0] : '',
      title: 'title' in item ? item.title : '',
      titleEn: 'title' in english ? english.title : '',
      startDate: 'startDate' in item ? item.startDate : '',
      endDate:
        'endDate' in item && item.endDate !== '재직 중' ? item.endDate : '',
    };
  }
);

export function isCareerList(value: unknown): value is Career[] {
  if (!Array.isArray(value) || value.length > 50) return false;
  const ids = new Set<string>();
  return value.every((item: unknown) => {
    if (!item || typeof item !== 'object') return false;
    const row = item as Record<string, unknown>;
    const fields = [
      'id',
      'company',
      'companyEn',
      'title',
      'titleEn',
      'startDate',
      'endDate',
    ];
    if (
      !fields.every(
        (key) => typeof row[key] === 'string' && row[key].length <= 200
      )
    )
      return false;
    if (
      !(row.id as string).trim() ||
      !(row.company as string).trim() ||
      !(row.title as string).trim() ||
      ids.has(row.id as string)
    )
      return false;
    ids.add(row.id as string);
    const date = /^\d{4}\.(0[1-9]|1[0-2])$/;
    return (
      date.test(row.startDate as string) &&
      (!row.endDate ||
        (date.test(row.endDate as string) &&
          (row.endDate as string) >= (row.startDate as string)))
    );
  });
}
