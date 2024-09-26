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
    webpack5: true,
    webpack: (config) => {
      config.resolve.fallback = { 
        fs: false,
        path: false };

      return config;
    },
  };