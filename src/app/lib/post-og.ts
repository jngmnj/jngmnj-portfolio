import 'server-only';

export type PostOgData = {
  title: string;
  description: string;
};

function createExcerpt(content: string) {
  return content
    .replace(/<[^>]*>/g, ' ')
    .replace(/[`#>*_~\[\]()!-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 180);
}

export async function getPostOgData(id: string): Promise<PostOgData | null> {
  if (!id) return null;

  try {
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
    if (!projectId || !apiKey) return null;

    const endpoint = new URL(
      `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(projectId)}/databases/(default)/documents/posts/${encodeURIComponent(id)}`
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
    const title = fields?.title?.stringValue?.trim();
    if (!title) return null;

    return {
      title,
      description: createExcerpt(fields?.content?.stringValue ?? ''),
    };
  } catch {
    return null;
  }
}
