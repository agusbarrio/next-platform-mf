const NextFederationPlugin = require('@module-federation/nextjs-mf')
const remotes = isServer => {
  const location = isServer ? 'ssr' : 'chunks';
  return {
    "next_core_mf": `next_core_mf@http://localhost:3001/_next/static/${location}/remoteEntry.js`,
  };
};
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  webpack: (config, options) => {

    config.plugins.push(
      new NextFederationPlugin({
        name: 'next_platform_mf',
        filename: "static/chunks/remoteEntry.js",
        remotes: remotes(options.isServer),
        exposes: {},
        shared: {},
      })
    )
    return config
  }
}

module.exports = nextConfig
