import 'server-only';

export type ProjectOgData = {
  title: string;
  description: string;
};

export async function getProjectOgData(
  id: string,
  lang: string
): Promise<ProjectOgData | null> {
  if (!id) return null;

  try {
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
    if (!projectId || !apiKey) return null;

    const endpoint = new URL(
      `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(projectId)}/databases/(default)/documents/projects/${encodeURIComponent(id)}`
    );
    endpoint.searchParams.set('key', apiKey);

    const response = await fetch(endpoint, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) return null;

    const document = (await response.json()) as {
      fields?: Record<string, { stringValue?: string }>;
    };
    const fields = document.fields;
    if (!fields) return null;

    const useEnglish = lang === 'en';
    const title =
      useEnglish && fields.titleEn?.stringValue
        ? fields.titleEn.stringValue
        : fields.title?.stringValue;
    const description =
      useEnglish && fields.descriptionEn?.stringValue
        ? fields.descriptionEn.stringValue
        : fields.description?.stringValue;

    if (typeof title !== 'string' || !title.trim()) return null;

    return {
      title: title.trim(),
      description: typeof description === 'string' ? description.trim() : '',
    };
  } catch {
    return null;
  }
}
