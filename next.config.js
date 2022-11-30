/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n:{
    locales: ['en-US', 'pt-BR'],
    defaultLocale: 'en-US'
  },
  pageExtensions: ["page.tsx", "api.ts"]
}

module.exports = nextConfig
