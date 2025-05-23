import removeImports from 'next-remove-imports';
import withTM from 'next-transpile-modules';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

// 불필요한 import 제거
const withRemoveImports = removeImports();

// 모듈 트랜스파일링기능 추가
export default withRemoveImports(
  withTM(['react-dom', 'react-icons'])(nextConfig)
);
