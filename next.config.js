const packageJson = require('./package.json');
const isDev = process.env.NODE_ENV !== 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  pageExtensions: ['tsx'],
  
};

module.exports = nextConfig;
