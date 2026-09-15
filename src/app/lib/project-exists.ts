import 'server-only';

/** Only an absent document is a 404; configuration and service errors must surface. */
export async function projectExists(id: string): Promise<boolean> {
  if (!id || id.includes('/') || id === '.' || id === '..') return false;

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!projectId || !apiKey)
    throw new Error('Project service is not configured');

  const endpoint = new URL(
    `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(projectId)}/databases/(default)/documents/projects/${encodeURIComponent(id)}`
  );
  endpoint.searchParams.set('key', apiKey);
  const response = await fetch(endpoint, {
    cache: 'no-store',
    signal: AbortSignal.timeout(10000),
  });
  if (response.status === 404) return false;
  if (!response.ok) throw new Error('Failed to fetch project');
  return true;
}
