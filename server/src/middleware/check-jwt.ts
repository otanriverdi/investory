import jwt from 'express-jwt';
// import jwtAuthz from 'express-jwt-authz';
import jwksRsa from 'jwks-rsa';

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://investory.eu.auth0.com/.well-known/jwks.json`,
  }),
  audience: 'https://investory-server.herokuapp.com/',
  issuer: `https://investory.eu.auth0.com/`,
  algorithms: ['RS256'],
  credentialsRequired: false,
});

export default checkJwt;
