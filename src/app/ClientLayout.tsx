'use client';

import AdminHeader from '@/components/admin/AdminHeader';
import AdminSidebar from '@/components/admin/AdminSidebar';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import TopBanner from '@/components/common/TopBanner';
import { fadeInLeft, getMotionVariants } from '@/utils/motion';
import { cn } from '@/utils/style';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

const queryClient = new QueryClient();

interface ClientLayoutProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

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
          <motion.div
            key="main"
            variants={getMotionVariants({
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -20 },
            })}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <MainLayout>{children}</MainLayout>
          </motion.div>
        )}
      </AnimatePresence>
    </QueryClientProvider>
  );
}

function AdminLayout({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsOpen(true);
  }, []);

  return (
    <>
      <AdminSidebar isOpen={isOpen} handleOpen={setIsOpen} />
      <div
        className={cn(
          mounted && isOpen ? 'ml-60' : 'ml-20',
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

function MainLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const [showHeader, setShowHeader] = useState(!isHomePage);

  useEffect(() => {
    // pathname 변경 시 showHeader 상태 업데이트
    if (isHomePage) {
      // 홈페이지는 스크롤 기반
      setShowHeader(window.scrollY > 100);
    } else {
      // 다른 페이지는 항상 표시
      setShowHeader(true);
    }
  }, [pathname, isHomePage]);

  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      // 100px 이상 스크롤하면 헤더 표시
      setShowHeader(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  return (
    <div className="flex min-h-screen flex-col">
      <TopBanner />
      {showHeader && <Header />}
      <div className="mx-auto flex w-full flex-1 flex-col">{children}</div>
      <Footer />
    </div>
  );
}
