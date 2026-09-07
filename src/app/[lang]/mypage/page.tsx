import { createPageMetadata } from '@/app/lib/og-metadata';
import MyPageClient from './MyPageClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return createPageMetadata({ lang, page: 'mypage', path: '/mypage' });
}

export default function MyPage() {
  return <MyPageClient />;
}
