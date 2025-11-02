/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000', 
        pathname: '/img/**', //todas las img de /img
      },
    ],
  },
};

export default nextConfig;