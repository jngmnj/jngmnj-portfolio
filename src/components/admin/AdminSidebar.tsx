import storage from '@/utils/storage';
import { cn } from '@/utils/style';
import { User } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FiLogOut } from 'react-icons/fi';
import {
  GoHeart,
  GoHome,
  GoNorthStar,
  GoPeople,
  GoStack,
  GoTools,
} from 'react-icons/go';
import { MdOutlineKeyboardDoubleArrowLeft } from 'react-icons/md';
import { RiMenu3Line } from 'react-icons/ri';

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [userData, setUserData] = useState<User | null>();
  const { route } = useRouter();

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

  const handleToggle = () => {
    console.log('isOpen', isOpen);
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <div className="md:block">
        <button
          type="button"
          onClick={handleToggle}
          className="cursor-pointer p-4"
        >
          <RiMenu3Line />
        </button>
      </div>
      <div
        className={cn(
          `fixed left-0 top-0 z-10 h-full max-h-screen w-80 border border-r-gray-200 bg-white p-4 transition-transform duration-300`,
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <button
          type="button"
          onClick={handleToggle}
          className="absolute right-2 top-2 z-10 cursor-pointer rounded-2xl p-3 opacity-0 transition hover:opacity-100"
        >
          <MdOutlineKeyboardDoubleArrowLeft className="text-2xl" />
        </button>
        <div className="mt-4 text-center">
          <Link href="/" className="p-4 text-2xl font-bold text-seagull-800">
            jngmnj
          </Link>
        </div>
        <div className="mt-8 flex flex-col gap-2">
          <Link href="/about">
            <div className="flex items-center gap-4 rounded-2xl p-4 font-semibold text-gray-500 transition hover:bg-gray-50 hover:text-seagull-800">
              <GoHome />
              <span>HOME</span>
            </div>
          </Link>
          <Link href="/admin/projects">
            <div className="flex items-center gap-4 rounded-2xl p-4 font-semibold text-gray-500 transition hover:bg-gray-50 hover:text-seagull-800">
              <GoStack />
              <span>프로젝트 관리</span>
            </div>
          </Link>
          <Link href="/admin/offers">
            <div className="flex items-center gap-4 rounded-2xl p-4 font-semibold text-gray-500 transition hover:bg-gray-50 hover:text-seagull-800">
              <GoNorthStar />
              <span>메인페이지 관리</span>
            </div>
          </Link>
          <Link href="/admin/users">
            <div className="flex items-center gap-4 rounded-2xl p-4 font-semibold text-gray-500 transition hover:bg-gray-50 hover:text-seagull-800">
              <GoPeople />
              <span>회원 관리</span>
            </div>
          </Link>
          <Link href="/admin/contact">
            <div className="flex items-center gap-4 rounded-2xl p-4 font-semibold text-gray-500 transition hover:bg-gray-50 hover:text-seagull-800">
              <GoHeart />
              <span>문의/방명록</span>
            </div>
          </Link>
          <Link href="/admin/setting">
            <div className="flex items-center gap-4 rounded-2xl p-4 font-semibold text-gray-500 transition hover:bg-gray-50 hover:text-seagull-800">
              <GoTools />
              <span>사이트 관리</span>
            </div>
          </Link>
        </div>
        <div className="absolute bottom-0">
          {!userData ? (
            <Link href="/login">
              <div className="flex items-center gap-4 rounded-2xl p-4 font-semibold hover:bg-gray-50">
                <span>Login</span>
              </div>
            </Link>
          ) : (
            <Link href="/logout">
              <div className="flex items-center gap-4 p-4 hover:text-seagull-800">
                <FiLogOut />
                <span>Logout</span>
              </div>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
