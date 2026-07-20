'use client';

import { LOCALE_COOKIE_NAME } from '@/app/lib/metadata-i18n';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminSidebar from '@/components/admin/AdminSidebar';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import TopBanner from '@/components/common/TopBanner';
import i18n from '@/i18n';
import { fadeInLeft, getMotionVariants } from '@/utils/motion';
import { cn } from '@/utils/style';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

const queryClient = new QueryClient();

interface ClientLayoutProps {
  children: ReactNode;
  lang: string;
  dictionary: Record<string, unknown>;
}

export default function ClientLayout({
  children,
  lang,
  dictionary,
}: ClientLayoutProps) {
  const pathname = usePathname();
  const isAdmin = pathname.includes('/admin');
  const isHomePage = pathname === `/${lang}`;

  // Sync i18n with URL locale before any child (e.g. Header) calls t() — avoids hydration mismatch
  if (lang && i18n.language !== lang) {
    i18n.changeLanguage(lang);
  }

  useEffect(() => {
    if (!lang) return;
    document.cookie = `${LOCALE_COOKIE_NAME}=${lang}; path=/; max-age=31536000; SameSite=Lax`;
  }, [lang]);

  return (
    <QueryClientProvider client={queryClient}>
      <AnimatePresence mode="wait">
        {isAdmin ? (
          <motion.div
            key="admin"
            variants={getMotionVariants(fadeInLeft)}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <AdminLayout>{children}</AdminLayout>
          </motion.div>
        ) : (
          <MainLayout isHomePage={isHomePage} lang={lang}>
            {children}
          </MainLayout>
        )}
      </AnimatePresence>
    </QueryClientProvider>
  );
}

function AdminLayout({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <AdminSidebar isOpen={isOpen} handleOpen={setIsOpen} />
      <div
        className={cn(
          isOpen ? 'lg:ml-60' : 'lg:ml-20',
          'transition-all duration-300 ease-in-out'
        )}
      >
        <AdminHeader
          isOpen={isOpen}
          handleToggle={() => setIsOpen((prev) => !prev)}
        />
        {children}
      </div>
    </>
  );
}

function MainLayout({
  children,
  isHomePage,
  lang,
}: {
  children: ReactNode;
  isHomePage: boolean;
  lang: string;
}) {
  if (isHomePage) return <>{children}</>;
  return (
    <div className="flex min-h-screen flex-col">
      <TopBanner />
      <Header initialLang={lang} />
      <div className="mx-auto flex w-full flex-1 flex-col">{children}</div>
      <Footer />
    </div>
  );
}
