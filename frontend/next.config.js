const headers = require("./headers");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: false,
  images: {},
  experimental: {
    scrollRestoration: true,
  },
  async headers() {
    return [
      {
        // 全てのパスに Security Headers を適用する
        source: "/(.*)",
        headers,
      },
    ];
  },
};

module.exports = nextConfig;
