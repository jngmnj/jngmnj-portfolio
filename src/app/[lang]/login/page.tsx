import LoginForm from '@/components/auth/LoginForm';
import { createPageMetadata } from '@/app/lib/og-metadata';
import Image from 'next/image';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return createPageMetadata({ lang, page: 'login', path: '/login' });
}

export default function LoginPage() {
  return (
    <div className="bg-login flex flex-1 flex-col justify-center">
      <div className="content container flex w-full flex-1 flex-col items-center justify-center">
        <div className="flex w-full flex-col items-center gap-6 md:flex-row md:gap-12">
          <div className="hidden w-full md:block md:w-1/2">
            <Image
              src="/images/about/img_temp.png"
              width={500}
              height={600}
              alt="login"
              className="size-full object-cover"
            />
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
