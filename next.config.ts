import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: '/backend/api/products',
        destination: '/api/products',
        permanent: false,
      },
      {
        source: '/backend/api/products.php',
        destination: '/api/products',
        permanent: false,
      },
      {
        source: '/backend/api/users',
        destination: '/api/users',
        permanent: false,
      },
      {
        source: '/backend/api/users.php',
        destination: '/api/users',
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self' *; script-src 'self' 'unsafe-eval' 'unsafe-inline' *; style-src 'self' 'unsafe-inline' *; font-src 'self' *; img-src 'self' data: https: blob: *; connect-src 'self' *; frame-src 'self' *;",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.shopatshams.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'iili.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'freeimage.host',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
