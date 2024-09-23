'use client';
import storage from '@/utils/storage';
import { cn } from '@/utils/style';
import { User } from 'firebase/auth';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  GoHeart,
  GoHome,
  GoNorthStar,
  GoPeople,
  GoStack,
  GoTools,
} from 'react-icons/go';

type AdminSidebarProps = {
  isOpen: boolean;
  handleOpen: (open: boolean) => void;
};

const AdminSidebar = ({ isOpen, handleOpen }: AdminSidebarProps) => {
  const [userData, setUserData] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // console.log('Header1 userData', storage.get('userData'));
      const storageData = storage.get<User>('userData');
      console.log(storageData);
      setUserData(storageData);
      if (userData == null || userData == undefined) {
        // router.push('/login');
        console.log('userdata가 업음!', storage.get<User>('userData'));
      }
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
  }, [router.route]);

  return (
    <>
      <div
        className={cn(
          `fixed left-0 top-0 z-10 h-full max-h-screen border-r border-r-gray-200 bg-white p-4 transition-all duration-300`,
          isOpen ? 'w-60' : 'w-20'
        )}
        onClick={() => handleOpen(true)}
        onMouseEnter={() => handleOpen(true)}
      >
        <div className="mt-4 text-center">
          <Link href="/" className="text-center">
            <Image
              src="/images/common/logo.svg"
              alt="logo"
              width={140}
              height={40}
              className="mx-auto"
            />
          </Link>
        </div>
        <div className="mt-8 flex flex-col gap-2">
          <Link href="/about">
            <div className="flex items-center gap-4 rounded-2xl p-4 font-semibold text-gray-500 transition hover:text-seagull-500">
              <GoHome />
              <span>HOME</span>
            </div>
          </Link>
          <Link href="/admin/projects">
            <div className="flex items-center gap-4 rounded-2xl p-4 font-semibold text-gray-500 transition hover:text-seagull-500">
              <GoStack />
              <span>프로젝트 관리</span>
            </div>
          </Link>
          <Link href="/admin/offers">
            <div className="flex items-center gap-4 rounded-2xl p-4 font-semibold text-gray-500 transition hover:text-seagull-500">
              <GoNorthStar />
              <span>메인페이지 관리</span>
            </div>
          </Link>
          <Link href="/admin/users">
            <div className="flex items-center gap-4 rounded-2xl p-4 font-semibold text-gray-500 transition hover:text-seagull-500">
              <GoPeople />
              <span>회원 관리</span>
            </div>
          </Link>
          <Link href="/admin/contact">
            <div className="flex items-center gap-4 rounded-2xl p-4 font-semibold text-gray-500 transition hover:text-seagull-500">
              <GoHeart />
              <span>문의/방명록</span>
            </div>
          </Link>
          <Link href="/admin/setting">
            <div className="flex items-center gap-4 rounded-2xl p-4 font-semibold text-gray-500 transition hover:text-seagull-500">
              <GoTools />
              <span>사이트 관리</span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
