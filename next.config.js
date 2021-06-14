/* eslint-disable no-undef */
module.exports = {
  async headers() {
    return [
      {
        // matching all API routes
        source: 'http://api.clapme.lets.com.vc/api/v1/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ];
  },
  images: {
    domains: [
      'www.teatrosaopedro.com.br',
      '149361159.v2.pressablecdn.com',
      process.env.NEXT_PUBLIC_API_URL,
    ],
  },
};
