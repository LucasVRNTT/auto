// next.config.js
module.exports = {
    async redirects() {
      return [
        {
          source: '/board.html',
          destination: '/index', // ou toute autre page
          permanent: true,
        },
      ];
    },
  };