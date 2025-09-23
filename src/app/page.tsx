import InquirySlider from '@/components/home/InquirySlider';
import MainBanner from '@/components/home/MainBanner';
import OffersSlider from '@/components/home/OffersSlider';
import { cn } from '@/utils/style';

export default function HomePage() {
  return (
    <main className="">
      <MainBanner />
      <div className={cn('inner')}>
        <div className="my-5 flex h-[80px] w-full items-center justify-between gap-4">
          <OffersSlider />
          <InquirySlider />
        </div>
      </div>
    </main>
  );
}
