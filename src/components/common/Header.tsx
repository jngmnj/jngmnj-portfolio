import Image from 'next/image';
import Link from 'next/link';
import { LINKS } from '../../app/lib/constants';
import Sidebar from './Sidebar';

const Header = () => {
  return (
    <>
      <header className="sticky top-0 right-0 left-0 z-50 border-b border-b-gray-200 bg-white">
        <div className="container flex items-center justify-between py-3 lg:py-4" style={{ overflow: 'visible' }}>
          <Link href="/" className="shrink-0">
            <h1 className="hidden text-2xl font-bold">jngmnj</h1>
            <Image
              src="/images/common/logo.svg"
              width={100}
              height={27}
              alt="logo"
              className="transition-opacity hover:opacity-80"
            />
          </Link>
          <nav className="hidden items-center justify-center lg:flex">
            <Link href="/about">
              <div className="hover:text-seagull-500 px-4 py-2 transition-colors">
                About
              </div>
            </Link>
            <Link href="/projects">
              <div className="hover:text-seagull-500 px-4 py-2 transition-colors">
                Projects
              </div>
            </Link>
            <Link href={LINKS.github_blog} target="_blank">
              <div className="hover:text-seagull-500 px-4 py-2 transition-colors">
                Blog
              </div>
            </Link>
            <Link href="/contact">
              <div className="hover:text-seagull-500 px-4 py-2 transition-colors">
                Contact
              </div>
            </Link>
          </nav>
          <div className="flex items-center justify-center lg:hidden">
            <Sidebar />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
