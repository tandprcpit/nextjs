/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'assets.aceternity.com',
          pathname: '**',
        },
        {
          protocol: 'https',
          hostname: 'images.unsplash.com',
          pathname: '**',
        },
        {
          protocol: 'https',
          hostname: 'aceternity.com',
          pathname: '**',
        },
        {
          protocol: 'https',
          hostname: 'media.licdn.com',
          pathname: '**',
        },
        {
            protocol: 'http',
            hostname: 'res.cloudinary.com',
            pathname: '**',
          },
          {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
            pathname: '**',
          },
        {
          protocol: 'https',
          hostname: 'corporate-assets.lucid.co',
          pathname: '**',
        },
        {
          protocol: 'https',
          hostname: 's3-ap-south-1.amazonaws.com',
          pathname: '**',
        },
      ],
    },
  };
  
  export default nextConfig;
  