import dotenv from 'dotenv';
dotenv.config();

import {ApolloServer} from 'apollo-server-express';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import 'reflect-metadata'; // required for typeorm
import {buildSchema} from 'type-graphql';
import {createConnection} from 'typeorm';
import checkJwt from './middleware/check-jwt';
import {InstrumentResolvers} from './resolvers/instrument';
import {PositionResolvers} from './resolvers/position';

createConnection()
  .then(async connection => {
    const app = express();

    app.use(
      helmet({
        contentSecurityPolicy:
          process.env.NODE_ENV === 'production' ? undefined : false,
      }),
    );
    app.use(cors({origin: '*', credentials: true}));
    app.use(checkJwt);

    const schema = await buildSchema({
      resolvers: [InstrumentResolvers, PositionResolvers],
    });

    const server = new ApolloServer({
      schema,
      context: ({req}) => ({
        db: connection,
        user: req.user ? req.user.sub : null,
      }),
    });

    server.applyMiddleware({app});

    app.listen(8000, () => {
      console.log(`🚀 on ${8000}`);
    });
  })
  .catch(error => console.error(error));

// This is for extending the express `req` object.
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user: {sub: string};
    }
  }
}
