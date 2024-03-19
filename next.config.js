/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ["localhost"],
    domains: ["172.16.15.49:4101"],
  },
  reactStrictMode: false
};

module.exports = nextConfig;
