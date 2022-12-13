/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: 'res.cloudinary.com',
  //       port: '443',
  //       pathname: '/counselokpabi/image/**',
  //     },
  //   ],
  // },

  images: {
    domains: ["res.cloudinary.com"],
  },
  
};

module.exports = nextConfig;
