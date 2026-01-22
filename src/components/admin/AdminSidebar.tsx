'use client';
import storage from '@/utils/storage';
import { cn } from '@/utils/style';
import { User } from 'firebase/auth';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
  const [userData, setUserData] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
      return storage.get<User>('userData');
    }
    return null;
  });
  const router = useRouter();

  useEffect(() => {
    // 로컬스토리지 이벤트 핸들러
    const handleUserDataChange = () => {
      // setUserData(storage.get<User>('userData'));
      setUserData(storage.get<User>('userData') ?? null);
    };
    // 이벤트 등록
    window.addEventListener('storageUserDataChange', handleUserDataChange);

    return () => {
      window.removeEventListener('storageUserDataChange', handleUserDataChange);
    };
  }, []);

  // setUserData 직후에 useData 읽으면 null임 -> useEffect로 처리
  useEffect(() => {
    const timer = setTimeout(() => {
      // 나중에 role이 admin인지 확인하기
      if (userData === null) {
        alert('로그인이 필요합니다.');
        router.push('/login');
      }
    }, 2000);

    // 클린업 함수: 컴포넌트가 언마운트될 때 타이머 해제
    return () => clearTimeout(timer);
  }, [router, userData]);

  return (
    <>
      <div
        className={cn(
          `fixed top-0 left-0 z-10 h-full max-h-screen border-r border-r-gray-200 bg-white p-4 transition-all duration-300`,
          isOpen ? 'w-60' : 'w-20'
        )}
        onClick={() => handleOpen(true)}
      >
        <div className="mt-4 overflow-hidden text-center">
          <Link href="/" className="flex items-center justify-center gap-2">
            <div className="bg-seagull-500 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white">
              <Image
                src="/favicon/android-chrome-192x192.png"
                alt="logo"
                width={32}
                height={32}
                className="brightness-0 invert-[1]"
              />
            </div>
            <div className="overflow-hidden">
              <Image
                src="/images/common/logo.svg"
                alt="logo"
                width={120}
                height={34}
                className="-ml-3.5 h-8 w-auto"
              />
            </div>
          </Link>
        </div>
        <div className="mt-4">
          <div
            className={`flex items-center rounded-md bg-gray-100 px-2 py-3 ${isOpen ? 'gap-2' : 'justify-center'}`}
          >
            <div className="relative size-8 shrink-0 overflow-hidden rounded-full">
              <Image
                src={userData?.photoURL || '/images/common/img_user.png'}
                alt={userData?.displayName || 'no-profile'}
                layout="fill"
              />
            </div>
            <div className="overflow-hidden whitespace-nowrap">
              <p className="font-semibold">{userData?.displayName}</p>
              <p className="text-xs text-gray-500">{userData?.email}</p>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-2">
          <Link href="/admin" title="관리자 홈">
            <div
              className={`hover:text-seagull-500 flex items-center gap-4 rounded-2xl py-3 pr-2 font-semibold text-gray-500 transition`}
            >
              <GoHome className="w-12 shrink-0 px-2 text-xl" />
              <span className="overflow-hidden whitespace-nowrap">HOME</span>
            </div>
          </Link>
          <Link href="/admin/projects" title="프로젝트 관리">
            <div
              className={`hover:text-seagull-500 flex items-center gap-4 rounded-2xl py-3 pr-2 font-semibold text-gray-500 transition`}
            >
              <GoStack className="w-12 shrink-0 px-2 text-xl" />
              <span className="overflow-hidden whitespace-nowrap">
                프로젝트 관리
              </span>
            </div>
          </Link>
          <Link href="/admin/offers" title="메인페이지 관리">
            <div
              className={`hover:text-seagull-500 flex items-center gap-4 rounded-2xl py-3 pr-2 font-semibold text-gray-500 transition`}
            >
              <GoNorthStar className="w-12 shrink-0 px-2 text-xl" />
              <span className="overflow-hidden whitespace-nowrap">
                메인페이지 관리
              </span>
            </div>
          </Link>
          <Link href="/admin/users" title="회원 관리">
            <div
              className={`hover:text-seagull-500 flex items-center gap-4 rounded-2xl py-3 pr-2 font-semibold text-gray-500 transition`}
            >
              <GoPeople className="w-12 shrink-0 px-2 text-xl" />
              <span className="overflow-hidden whitespace-nowrap">
                회원 관리
              </span>
            </div>
          </Link>
          <Link href="/admin/contact" title="문의/방명록">
            <div
              className={`hover:text-seagull-500 flex items-center gap-4 rounded-2xl py-3 pr-2 font-semibold text-gray-500 transition`}
            >
              <GoHeart className="w-12 shrink-0 px-2 text-xl" />
              <span className="overflow-hidden whitespace-nowrap">
                문의/방명록
              </span>
            </div>
          </Link>
          <Link href="/admin/setting" title="사이트 관리">
            <div
              className={`hover:text-seagull-500 flex items-center gap-4 rounded-2xl py-3 pr-2 font-semibold text-gray-500 transition`}
            >
              <GoTools className="w-12 shrink-0 px-2 text-xl" />
              <span className="overflow-hidden whitespace-nowrap">
                사이트 관리
              </span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
