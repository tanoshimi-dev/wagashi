import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  
  // basePath: '/demo/trade_front',
  // assetPrefix: '/demo/trade_front',
  basePath: '',
  assetPrefix: '',
  
  // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
  trailingSlash: true,
  // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
  // skipTrailingSlashRedirect: true,
 
  // Optional: Change th

  // images: {
  //   domains: ['images.dog.ceo', 'localhost'], //ここにドメインを指定
  // },
  images: {
    unoptimized: true,
  },
  
  /* config options here */
  reactStrictMode: true,



  transpilePackages: ['@mui/x-data-grid'],
  // experimental: {
  //   esmExternals: false,
  // },
  // webpack: (config, { isServer }) => {
  //   // Handle CSS imports from @mui/x-data-grid
  //   config.module.rules.push({
  //     test: /\.css$/,
  //     include: /node_modules\/@mui\/x-data-grid/,
  //     use: 'ignore-loader',
  //   });

  //   return config;
  // },
};

export default nextConfig;
