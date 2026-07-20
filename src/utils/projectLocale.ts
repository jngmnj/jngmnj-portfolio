import { FirebaseProject, SerializedTimestamp } from '@/types';

type Locale = string | undefined;

export function getProjectTitle(project: FirebaseProject, locale: Locale) {
  return locale?.startsWith('en') && project.titleEn
    ? project.titleEn
    : project.title;
}

export function getProjectDescription(
  project: FirebaseProject,
  locale: Locale
) {
  return locale?.startsWith('en') && project.descriptionEn
    ? project.descriptionEn
    : project.description;
}

export function getProjectOverview(project: FirebaseProject, locale: Locale) {
  return locale?.startsWith('en') && project.detail?.overviewEn
    ? project.detail.overviewEn
    : project.detail?.overview;
}

export function getLocalizedList(
  baseItems: string[] | undefined,
  englishItems: string[] | undefined,
  locale: Locale
) {
  return locale?.startsWith('en') && englishItems?.length
    ? englishItems
    : baseItems || [];
}

export function getTimestampMillis(
  timestamp: FirebaseProject['createdAt'] | FirebaseProject['updatedAt']
) {
  if (!timestamp) return 0;

  if ('toMillis' in timestamp && typeof timestamp.toMillis === 'function') {
    return timestamp.toMillis();
  }

  const serializedTimestamp = timestamp as SerializedTimestamp;
  return (
    serializedTimestamp.seconds * 1000 +
    serializedTimestamp.nanoseconds / 1000000
  );
}
