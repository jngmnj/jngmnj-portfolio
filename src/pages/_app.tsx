import AdminSidebar from '@/components/admin/AdminSidebar';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import '@/styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isAdmin = router.pathname.startsWith('/admin');

  return (
    <QueryClientProvider client={queryClient}>
      {isAdmin ? (
        <>
          <AdminSidebar />
          <Component {...pageProps} />
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
