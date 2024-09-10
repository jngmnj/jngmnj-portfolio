import Button from '@/components/common/Button';
import { useAuth } from '@/utils/hooks';
import storage from '@/utils/storage';
import { User } from 'firebase/auth';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import Sidebar from './Sidebar';
import TopBanner from './TopBanner';

const Header = () => {
  const { route } = useRouter();

  const [userData, setUserData] = useState<User | null>(null);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // console.log('Header1 userData', storage.get('userData'));
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
  }, [route]);

  console.log('Header userData', userData);
  const { logOut } = useAuth();
  return (
    <>
      <TopBanner />
      <div className="inner flex items-center justify-between">
        <Link href="/">
          <h1 className="text-2xl font-bold">jngmnj</h1>
        </Link>
        <div className="hidden items-center justify-center lg:flex">
          <Link href="/about">
            <div className="p-4">About</div>
          </Link>
          <Link href="/projects">
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
                className=""
              >
                <div>로그아웃</div>
              </Button>
            </div>
          ) : (
            <Link href="/login">
              <div className="p-4">로그인</div>
            </Link>
          )}
          <Sidebar userData={userData} />
        </div>
      </div>
    </>
  );
};

export default Header;
