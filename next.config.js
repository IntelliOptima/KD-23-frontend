/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverActions: true,
      serverComponentsExternalPackages: ['@acme/ui'],
    },
    images: {
      domains: ['image.tmdb.org']
    }
  };
  
  module.exports = nextConfig;


  module.exports = {
    images: {
      domains: ['image.tmdb.org'], 
    },
  };
  