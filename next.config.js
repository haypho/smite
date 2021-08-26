const app = require("./package.json");

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['webcdn.hirezstudios.com'],
  },
  basePath: process.env.BASE_PATH,
  assetPrefix: app.homepage,
}
