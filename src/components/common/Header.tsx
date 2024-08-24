import Link from 'next/link';
import { FiSearch } from 'react-icons/fi';
import TopBanner from './TopBanner';

const Header = () => {
  return (
    <>
      <TopBanner />
      <div className="inner flex items-center justify-between">
        <Link href="/">
          <h1 className="text-2xl font-bold">jngmnj</h1>
        </Link>
        <div className="flex items-center justify-center">
          <Link href="/about">
            <div className="p-4">About</div>
          </Link>
          <Link href="/about">
            <div className="p-4">Projects</div>
          </Link>
          <Link href="/blog">
            <div className="p-4">Blog</div>
          </Link>
          <Link href="/contact">
            <div className="p-4">Contact</div>
          </Link>
        </div>
        <div className="flex items-center justify-center">
          <button type="button" className="p-4">
            <FiSearch />
          </button>
          <Link href="/login">
            <div className="p-4">Login</div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
