import RegisterForm from '@/components/auth/RegisterForm';
import { createPageMetadata } from '@/app/lib/og-metadata';
import Image from 'next/image';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return createPageMetadata({ lang, page: 'register', path: '/register' });
}

export default function RegisterPage() {
  return (
    <div className="bg-login flex flex-1 flex-col">
      <div className="content container flex w-full flex-1 items-center justify-center">
        <div className="flex w-full flex-col items-center gap-6 md:flex-row md:gap-12">
          <div className="hidden w-full md:block md:w-1/2">
            <Image
              src="/images/about/img_temp.png"
              width={500}
              height={600}
              alt="Register"
              className="size-full object-cover"
            />
          </div>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
