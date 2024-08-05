/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'www.blumotive.it',
            port: '',
            pathname: '/**',
          },
        ],
      },
};

export default nextConfig;
