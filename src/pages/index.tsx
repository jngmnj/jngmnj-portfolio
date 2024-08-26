import MainBanner from '@/components/home/MainBanner';
import { cn } from '@/utils/style';

export default function Home() {
  return (
    <main
      className={cn('flex min-h-screen flex-col items-center justify-between')}
    >
      <MainBanner />
    </main>
  );
}
