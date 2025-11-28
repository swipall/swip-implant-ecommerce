import {NextConfig} from 'next';

const nextConfig: NextConfig = {
    cacheComponents: true,
    turbopack: {
        root: process.cwd()
    },
    images: {
        remotePatterns: [
            {
                hostname: 'readonlydemo.vendure.io',
            },
            {
                hostname: 'demo.vendure.io'
            }
        ],
    },
    experimental: {
        authInterrupts: true,
    }
};

export default nextConfig;