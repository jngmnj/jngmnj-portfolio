import ExperienceSection from '@/components/about/ExperienceSection';
import IntroductionSection from '@/components/about/IntroductionSection';
import PortfolioLinksSection from '@/components/about/PortfolioLinksSection';

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
