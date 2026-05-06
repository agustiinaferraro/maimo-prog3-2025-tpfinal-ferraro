/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  experimental: {
    turbo: false, // desactiva turbopack
  },

  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/img/**",
      },
      {
        protocol: "https",
        hostname: "prog3-tp-finalback-ferraroagustina.vercel.app",
        pathname: "/img/**",
      },
    ],
    qualities: [75],
  },
};

export default nextConfig;
