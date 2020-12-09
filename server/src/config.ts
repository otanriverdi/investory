const config = {
  auth: {
    secret: {
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: process.env.AUTH_JWKS || '',
    },
    jwt: {
      audience: process.env.AUTH_AUDIENCE,
      issuer: process.env.AUTH_ISSUER,
      algorithms: ['RS256'],
      credentialsRequired: false,
    },
  },
  iex: {
    url:
      process.env.ENABLE_IEX === 'true'
        ? 'https://cloud.iexapis.com/stable'
        : 'https://sandbox.iexapis.com/stable',
  },
};

export default config;
