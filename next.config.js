/** @type {import('next').NextConfig} */
const isStaticExport = process.env.CAPACITOR_STATIC_EXPORT === 'true'

const nextConfig = {
  ...(isStaticExport && {
    output: 'export',
    trailingSlash: true,
    images: {
      unoptimized: true,
    },
  }),
}

module.exports = nextConfig
