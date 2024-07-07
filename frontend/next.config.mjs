/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: 'vibz.s3.eu-central-1.amazonaws.com',
                pathname: "**"
            }, {
                protocol: "http",
                hostname: "localhost",
                port: "8080",
                pathname: "**"
            }

        ],
    },

};

export default nextConfig;
