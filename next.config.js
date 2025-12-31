/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {},
  // Exclude problematic packages from bundling
  serverExternalPackages: ['thread-stream', 'pino-pretty', 'lokijs', 'encoding'],
};

module.exports = nextConfig;
