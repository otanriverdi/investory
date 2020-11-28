import dotenv from 'dotenv';
dotenv.config();

import cors from '@koa/cors';
import {ApolloServer} from 'apollo-server-koa';
import Koa from 'koa';
import helmet from 'koa-helmet';
import 'reflect-metadata'; // required for typeorm
import {createConnection} from 'typeorm';
import {resolvers} from './resolvers';
import {typeDefs} from './typeDefs';

createConnection()
  .then(async connection => {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: {connection},
    });

    const app = new Koa();

    app.use(
      helmet({
        contentSecurityPolicy:
          process.env.NODE_ENV === 'production' ? undefined : false,
      }),
    );
    app.use(cors({origin: '*'}));

    server.applyMiddleware({app});

    app.listen(8000, () => {
      console.log(`🚀 on ${8000}`);
    });
  })
  .catch(error => console.error(error));
