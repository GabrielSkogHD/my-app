/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'standalone', // Krävs för Docker-optimering
};

module.exports = nextConfig;
