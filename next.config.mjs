/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "xn--vl2bo7n9oa48ab2r7zqs7b.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
