import AdminHeader from '@/components/admin/AdminHeader';
import AdminSidebar from '@/components/admin/AdminSidebar';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import '@/styles/globals.css';
import { cn } from '@/utils/style';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useState } from 'react';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const isAdmin = router.pathname.startsWith('/admin');

  return (
    <QueryClientProvider client={queryClient}>
      {isAdmin ? (
        <>
          <AdminSidebar isOpen={isOpen} handleOpen={setIsOpen} />
          <div
            className={cn(
              isOpen ? 'ml-60' : 'ml-0',
              'transition-all duration-300 ease-in-out'
            )}
          >
            <AdminHeader handleToggle={() => setIsOpen((prev) => !prev)} />
            <Component {...pageProps} />
          </div>
        </>
      ) : (
        <>
          <Header />
          <div className="mx-auto">
            <Component {...pageProps} />
          </div>
          <Footer />
        </>
      )}
    </QueryClientProvider>
  );
}
