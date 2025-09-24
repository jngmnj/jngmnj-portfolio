import Button from '@/components/common/Button';
import { useAuth } from '@/utils/hooks';
import storage from '@/utils/storage';
import { User } from 'firebase/auth';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import TopBanner from './TopBanner';

const Header = () => {
  const pathname = usePathname();

  const [userData, setUserData] = useState<User | null>(null);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUserData(storage.get<User>('userData'));
    }

    // 로컬스토리지 이벤트 핸들러
    const handleUserDataChange = () => {
      setUserData(storage.get<User>('userData'));
    };

    // 이벤트 등록
    window.addEventListener('storageUserDataChange', handleUserDataChange);

    return () => {
      window.removeEventListener('storageUserDataChange', handleUserDataChange);
    };
  }, [pathname]);

  const { logOut } = useAuth();
  return (
    <>
      <TopBanner />
      <header className="sticky top-0 right-0 left-0 z-50 border-b border-b-gray-200 bg-white">
        <div className="inner flex items-center justify-between">
          <Link href="/">
            <h1 className="hidden text-2xl font-bold">jngmnj</h1>
            <Image
              src="/images/common/logo.svg"
              width={100}
              height={27}
              alt="logo"
            />
          </Link>
          <div className="hidden items-center justify-center lg:flex">
            <Link href="/about">
              <div className="hover:text-seagull-500 p-4 transition-colors">
                About
              </div>
            </Link>
            <Link href="/projects">
              <div className="hover:text-seagull-500 p-4 transition-colors">
                Projects
              </div>
            </Link>
            <Link href="/blog">
              <div className="hover:text-seagull-500 p-4 transition-colors">
                Blog
              </div>
            </Link>
            <Link href="/contact">
              <div className="hover:text-seagull-500 p-4 transition-colors">
                Contact
              </div>
            </Link>
          </div>
          <div className="flex items-center justify-center">
            {/* 기능 추후 구현 */}
            {/* <button type="button" className="p-4">
              <FiSearch />
            </button> */}
            {userData ? (
              <div className="flex items-center justify-center gap-3">
                <Link href="/mypage">
                  <Image
                    src={userData?.photoURL ?? '/images/common/img_user.png'}
                    width={40}
                    height={40}
                    className="rounded-full"
                    alt=""
                  />
                </Link>
                <Button
                  type="button"
                  color="linePrimary"
                  size="small"
                  onClick={logOut}
                  className="hidden lg:block"
                >
                  <div>Logout</div>
                </Button>
              </div>
            ) : (
              <Link href="/login" className="hidden lg:block">
                <div className="hover:text-seagull-500 p-4 transition-colors">
                  Login
                </div>
              </Link>
            )}
            <Sidebar userData={userData} className="lg:hidden" />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
