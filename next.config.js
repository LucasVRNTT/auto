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
        },
      ];
    },
  };