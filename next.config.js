/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'imge.kugou.com',
                port: '',
                pathname: '/stdmusic/**',
            },
        ],
    }
}

module.exports = nextConfig
