import { defaultHomeSettings, isHomeSettings } from '@/data/homeSettings';
import { getAdminDb } from '@/lib/firebaseAdmin';
export async function getHomeSettings() {
  const doc = await getAdminDb().collection('siteContent').doc('home').get();
  const settings: unknown = doc.exists
    ? doc.data()?.settings
    : defaultHomeSettings;
  if (!isHomeSettings(settings)) throw new Error('Invalid home settings');
  return settings;
}
