import ScrollSnapWrapper from '@/components/home/ScrollSnapWrapper';
import { getHomeSettings } from '@/app/lib/getHomeSettings';
import { defaultHomeSettings } from '@/data/homeSettings';
export const dynamic = 'force-dynamic';
export default async function HomePage() {
  const settings = await getHomeSettings().catch(() => defaultHomeSettings);
  return <ScrollSnapWrapper settings={settings} />;
}
