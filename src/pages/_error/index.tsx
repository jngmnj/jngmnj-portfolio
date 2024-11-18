import { NextPageContext } from 'next';
import Link from 'next/link';

interface ErrorProps {
  statusCode?: number;
}

function Error({ statusCode }: ErrorProps) {
  return (
    <div className="flex h-[80vh] flex-col items-center justify-center">
      <p className="mb-6">페이지를 찾을 수 없습니다.</p>
      <h1 className="mb-10 text-9xl font-black">
        {statusCode ? `${statusCode}` : '클라이언트에 문제가 있습니다.'}
      </h1>
      <p>
        <Link href="/" className="text-seagull-500 underline">
          홈으로 돌아가기
        </Link>
      </p>
    </div>
  );
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
