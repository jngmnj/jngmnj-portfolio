import Link from 'next/link';

const TopBanner = () => {
  return (
    <Link
      href="/contact"
      className="flex h-[40px] items-center justify-center bg-black text-white"
    >
      I am open to new opportunities
    </Link>
  );
};

export default TopBanner;
