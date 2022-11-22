/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    POKE_BE_URL: process.env.POKE_BE_URL,
  },
};

module.exports = nextConfig;
