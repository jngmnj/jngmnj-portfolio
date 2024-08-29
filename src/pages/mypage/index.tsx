import Image from 'next/image';
import Link from 'next/link';

const index = () => {
  return (
    <div className="container">
      <div className="flex gap-8">
        <aside className="w-1/4">
          <Link href="/mypage">마이페이지</Link>
          <Link href="/mypage/info">내 정보 수정</Link>
          <Link href="/mypage/info">내 활동</Link>
        </aside>
        <div className="w-3/4">
          <h2 className="text-2xl font-semibold">내 정보</h2>
          <div className="mt-4 flex items-center gap-4">
            <Image
              src="/images/about/img_temp.png"
              width={100}
              height={100}
              className="rounded-full"
              alt=""
            />
            <div>
              <h3 className="text-xl font-semibold">홍길동</h3>
              <p className="text-sm text-gray-500"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
