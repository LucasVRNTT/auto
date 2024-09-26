// next.config.js
module.exports = {
    async redirects() {
      return [
        {
          source: '/board.html',
          destination: '/index', // ou toute autre page
          permanent: true,
          has: [
            {
              type: 'header',
              key: 'x-fetch',
              value: 'true', // Vérifiez un en-tête spécifique si besoin
            },
          ],
          source: '/single.html',
          destination: '/index', // ou toute autre page
          permanent: true,
          has: [
            {
              type: 'header',
              key: 'x-fetch',
              value: 'true', // Vérifiez un en-tête spécifique si besoin
            },
          ],
        },
      ];
    },
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://api.external-service.com/:path*', // Réécritures d'URL pour les API externes
        },
      ]
    },
    webpack: (config, { isServer }) => {
      // Modifications du comportement du Webpack
      if (!isServer) {
        config.resolve.fallback = {
          fs: false, // Désactive l'utilisation de fs côté client
        };
      }
      return config;
    },
  };