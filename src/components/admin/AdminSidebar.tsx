'use client';
import { useScrollLock } from '@/utils/hooks';
import storage from '@/utils/storage';
import { cn } from '@/utils/style';
import { useLocale } from '@/utils/useLocale';
import { User } from 'firebase/auth';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
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
  const lang = useLocale();
  const [userData, setUserData] = useState<User | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // 모바일 감지
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 모바일에서 사이드바 열릴 때 스크롤 잠금
  useScrollLock(isMobile && isOpen);

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

  // 로그인/권한 체크는 middleware(proxy)에서 처리

  return (
    <>
      {/* 모바일 오버레이 */}
      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            onClick={() => handleOpen(false)}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      {/* 사이드바 */}
      <motion.div
        className={cn(
          `fixed top-0 left-0 z-50 h-full max-h-screen border-r border-r-gray-200 bg-white p-4 transition-all duration-300`,
          isOpen ? 'w-60' : 'w-20'
        )}
        initial={false}
        animate={{
          x: isMobile && !isOpen ? '-100%' : 0,
        }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        onClick={(e) => {
          // 모바일이 아니고 사이드바가 닫혀있을 때만 열기
          if (!isMobile && !isOpen) {
            handleOpen(true);
          }
          // 모바일에서는 사이드바 내부 클릭 시 이벤트 전파 방지
          if (isMobile) {
            e.stopPropagation();
          }
        }}
      >
        <div className="mt-4 overflow-hidden text-center">
          <Link
            href={`/${lang}`}
            className="flex items-center justify-center gap-2"
          >
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
                width={32}
                height={32}
              />
            </div>
            <div className="overflow-hidden whitespace-nowrap">
              <p className="font-semibold">{userData?.displayName}</p>
              <p className="text-xs text-gray-500">{userData?.email}</p>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-2">
          <Link href={`/${lang}/admin`} title="관리자 홈">
            <div
              className={`hover:text-seagull-500 flex min-h-10 items-center gap-4 rounded-2xl py-3 pr-2 font-semibold text-gray-500 transition`}
            >
              <GoHome className="w-12 shrink-0 px-2 text-xl" />
              <span className="overflow-hidden whitespace-nowrap">HOME</span>
            </div>
          </Link>
          <Link href={`/${lang}/admin/projects`} title="프로젝트 관리">
            <div
              className={`hover:text-seagull-500 flex min-h-10 items-center gap-4 rounded-2xl py-3 pr-2 font-semibold text-gray-500 transition`}
            >
              <GoStack className="w-12 shrink-0 px-2 text-xl" />
              <span className="overflow-hidden whitespace-nowrap">
                프로젝트 관리
              </span>
            </div>
          </Link>
          <Link href={`/${lang}/admin/offers`} title="메인페이지 관리">
            <div
              className={`hover:text-seagull-500 flex min-h-10 items-center gap-4 rounded-2xl py-3 pr-2 font-semibold text-gray-500 transition`}
            >
              <GoNorthStar className="w-12 shrink-0 px-2 text-xl" />
              <span className="overflow-hidden whitespace-nowrap">
                메인페이지 관리
              </span>
            </div>
          </Link>
          <Link href={`/${lang}/admin/users`} title="회원 관리">
            <div
              className={`hover:text-seagull-500 flex min-h-10 items-center gap-4 rounded-2xl py-3 pr-2 font-semibold text-gray-500 transition`}
            >
              <GoPeople className="w-12 shrink-0 px-2 text-xl" />
              <span className="overflow-hidden whitespace-nowrap">
                회원 관리
              </span>
            </div>
          </Link>
          <Link href={`/${lang}/admin/contact`} title="문의/방명록">
            <div
              className={`hover:text-seagull-500 flex min-h-10 items-center gap-4 rounded-2xl py-3 pr-2 font-semibold text-gray-500 transition`}
            >
              <GoHeart className="w-12 shrink-0 px-2 text-xl" />
              <span className="overflow-hidden whitespace-nowrap">
                문의/방명록
              </span>
            </div>
          </Link>
          <Link href={`/${lang}/admin/setting`} title="사이트 관리">
            <div
              className={`hover:text-seagull-500 flex min-h-10 items-center gap-4 rounded-2xl py-3 pr-2 font-semibold text-gray-500 transition`}
            >
              <GoTools className="w-12 shrink-0 px-2 text-xl" />
              <span className="overflow-hidden whitespace-nowrap">
                사이트 관리
              </span>
            </div>
          </Link>
        </div>
      </motion.div>
    </>
  );
};

export default AdminSidebar;
