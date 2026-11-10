import { redirect } from 'next/navigation';
export default async function CareersRedirect({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  redirect(`/${lang}/admin/about`);
}
