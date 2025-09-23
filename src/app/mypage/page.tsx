'use client';

import storage from '@/utils/storage';
import { User } from 'firebase/auth';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function MypagePage() {
  const [userData, setUserData] = useState<User | null>();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUserData(storage.get<User>('userData'));
    }
    console.log(userData);
  }, []);

  return (
    <div className="container">
      <div className="flex flex-1 gap-8">
        <aside className="h-full w-1/4 border-r border-r-gray-100">
          <div className="flex flex-col gap-4">
            <Link href="/mypage" className="p-2">
              마이페이지
            </Link>
            <Link href="/mypage/info" className="p-2">
              내 정보 수정
            </Link>
            <Link href="/mypage/info" className="p-2">
              내 활동
            </Link>
          </div>
        </aside>
        <div className="w-3/4">
          <h2 className="text-2xl font-semibold">마이페이지</h2>
          <div className="mt-4 flex items-center gap-4">
            <Image
              src={userData?.photoURL ?? '/images/common/img_user.png'}
              width={100}
              height={100}
              className="rounded-full"
              alt=""
            />
            <div>
              <h3 className="text-xl font-semibold">홍길동님 안녕하세요.</h3>
              <p className="text-sm text-gray-500"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
