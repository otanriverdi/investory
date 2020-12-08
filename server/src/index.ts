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
import {CommentResolvers} from './resolvers/comment';
import {InstrumentResolvers} from './resolvers/instrument';
import {NewsResolvers} from './resolvers/news';
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
    app.use(cors({origin: process.env.FRONTEND_URL, credentials: true}));
    app.use(checkJwt);

    const schema = await buildSchema({
      resolvers: [
        InstrumentResolvers,
        PositionResolvers,
        NewsResolvers,
        CommentResolvers,
      ],
    });

    const server = new ApolloServer({
      schema,
      context: ({req}) => {
        return {
          db: connection,
          user: req.user ? req.user.sub : null,
        };
      },
    });

    server.applyMiddleware({app});

    const port = process.env.PORT || 8000;

    app.listen(port, () => {
      console.log(`🚀 on ${port}`);
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
