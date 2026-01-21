import {NextConfig} from 'next';

const nextConfig: NextConfig = {
    cacheComponents: true,
    images: {
        // This is necessary to display images from your Swipall instance
        dangerouslyAllowLocalIP: true,
        remotePatterns: [
            {
                hostname: 'localhost'
            }
        ],
    },
    experimental: {
        rootParams: true
    }
};

export default nextConfig;