'use client';

import { useLocale } from '@/utils/useLocale';
import Link from 'next/link';

const TopBanner = () => {
  const lang = useLocale();
  return (
    <Link
      href={`/${lang}/contact`}
      className="flex h-[40px] items-center justify-center bg-black text-white"
    >
      I am open to new opportunities
    </Link>
  );
};

export default TopBanner;
