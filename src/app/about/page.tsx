import ExperienceSection from '@/components/about/ExperienceSection';
import IntroductionSection from '@/components/about/IntroductionSection';
import PortfolioLinksSection from '@/components/about/PortfolioLinksSection';
import StatsSection from '@/components/about/StatsSection';

export default function AboutPage() {
  return (
    <div className="container">
      {/* introduction */}
      {/* 추후 페이지단위 스크롤로 수정 */}
      <IntroductionSection />
      <StatsSection />
      {/* portfolio link */}
      <PortfolioLinksSection />
      {/* experience */}
      <ExperienceSection />
    </div>
  );
}
