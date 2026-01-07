/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@vehicle-dispatch/shared'],
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/graphql',
  },
};

module.exports = nextConfig;
