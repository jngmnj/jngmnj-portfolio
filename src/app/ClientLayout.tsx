'use client';

import AdminHeader from '@/components/admin/AdminHeader';
import AdminSidebar from '@/components/admin/AdminSidebar';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import { fadeInLeft, getMotionVariants } from '@/utils/motion';
import { cn } from '@/utils/style';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode, useState } from 'react';

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
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <AdminSidebar isOpen={isOpen} handleOpen={setIsOpen} />
      <div
        className={cn(
          isOpen ? 'ml-60' : 'ml-20',
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
  return (
    <>
      <Header />
      <div className="mx-auto">{children}</div>
      <Footer />
    </>
  );
}
