import InquirySlider from '@/components/home/InquirySlider';
import MainBanner from '@/components/home/MainBanner';
import OffersSlider from '@/components/home/OffersSlider';
import { cn } from '@/utils/style';

export default function Home() {
  return (
    <main
      className={cn('flex min-h-screen flex-col items-center justify-between')}
    >
      <MainBanner />
      <div className={cn('inner')}>
        <div className="flex h-[200px] w-full items-center justify-between gap-4">
          <OffersSlider />
          <InquirySlider />
        </div>
      </div>
    </main>
  );
}
