import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import '@/styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import Sidebar from '../components/common/Sidebar';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Sidebar />
      <div className="container mx-auto px-4">
        <Component {...pageProps} />
      </div>
      <Footer />
    </QueryClientProvider>
  )
}
