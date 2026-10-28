const isDev = process.env.NODE_ENV === 'development';
// Vercel のプレビューではコメント用ツールバー（vercel.live）を読み込むため許可する
const isPreview = process.env.VERCEL_ENV === 'preview';
const vercelLive = isPreview ? ' https://vercel.live' : '';

const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}${vercelLive}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: https://images.microcms-assets.io${vercelLive}`,
  "font-src 'self' data:",
  `connect-src 'self'${isPreview ? ' https://vercel.live wss://ws-us3.pusher.com' : ''}`,
  `frame-src ${isPreview ? 'https://vercel.live' : "'none'"}`,
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  ...(isDev ? [] : ['upgrade-insecure-requests']),
].join('; ');

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: contentSecurityPolicy },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
