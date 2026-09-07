import ExperienceSection from '@/components/about/ExperienceSection';
import IntroductionSection from '@/components/about/IntroductionSection';
import PortfolioLinksSection from '@/components/about/PortfolioLinksSection';
import { createPageMetadata } from '@/app/lib/og-metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return createPageMetadata({ lang, page: 'about', path: '/about' });
}

export default function AboutPage() {
  return (
    <>
      <IntroductionSection />
      <div className="container">
        <PortfolioLinksSection />
        <ExperienceSection />
      </div>
    </>
  );
}
