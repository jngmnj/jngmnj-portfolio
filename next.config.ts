import type { NextConfig } from 'next';
import { LINKS } from './src/app/lib/constants';
import { INTERNAL_BLOG_ENABLED } from './src/constants/features';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    if (INTERNAL_BLOG_ENABLED) return [];
    return [
      {
        source: '/blog/:path*',
        destination: LINKS.github_blog,
        permanent: false,
      },
      {
        source: '/:lang(ko|en)/blog/:path*',
        destination: LINKS.github_blog,
        permanent: false,
      },
    ];
  },
  experimental: {
    cpus: 1,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
