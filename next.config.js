/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["suitmedia.static-assets.id"],
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.igem.wiki",
        port: "",
        pathname: "/teams/4914/wiki/**",
      },
    ],
  },
  trailingSlash: true,
};

module.exports = nextConfig;
