/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    typescript: {
        tsconfigPath: './src/tsconfig.json',
    },
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '3000',
                pathname: '/static/images/**',
            },
        ],
    },
};

module.exports = nextConfig;
