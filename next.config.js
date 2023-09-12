/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'imge.kugou.com',
                port: '',
                pathname: '/stdmusic/**',
            },
        ],
    },
}

module.exports = nextConfig
