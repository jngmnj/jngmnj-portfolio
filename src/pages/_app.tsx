import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import '@/styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <div className="mx-auto">
        <Component {...pageProps} />
      </div>
      <Footer />
    </QueryClientProvider>
  );
}
