import Button from '@/components/common/Button';
import { useAuth } from '@/utils/hooks';
import storage from '@/utils/storage';
import { User } from 'firebase/auth';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import TopBanner from './TopBanner';


const Header = () => {
  let initialUserData = null;
  useEffect(() => {
    if(typeof window !== 'undefined') {
      console.log('userData', storage.get('userData'));
      initialUserData = storage.get<User>('userData');
    }    
  } , []);

  const [userData, setUserData] = useState<User | null>(initialUserData);

  const { signOut } = useAuth();
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
          {initialUserData ? (
            <div className="flex items-center justify-center">
              <Link href="/mypage">
                <Image src={userData?.photoURL ?? ''} className="p-4" alt="" />
              </Link>
              <Button type="button" onClick={signOut}>
                <div className="p-4">로그아웃</div>
              </Button>
            </div>
          ) : (
            <Link href="/login">
              <div className="p-4">로그인</div>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
