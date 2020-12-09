import jwt from 'express-jwt';
import config from '../config';
import jwksRsa from 'jwks-rsa';

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({...config.auth.secret}),
  ...config.auth.jwt,
});

export default checkJwt;
