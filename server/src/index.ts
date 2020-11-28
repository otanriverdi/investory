import 'reflect-metadata'; // required for typeorm
import {createConnection} from 'typeorm';
import {ApolloServer} from 'apollo-server';
import {typeDefs} from './typeDefs';
import {resolvers} from './resolvers';

createConnection()
  .then(async connection => {
    // TODO add connection to graphql context.

    // SERVER LOGIC SHOULD BE HERE TO MAKE SURE IT RUNS AFTER THE CONNECTION
    const server = new ApolloServer({typeDefs, resolvers});
    server.listen().then(({url}) => {
      console.log(`🚀 Apollo server ready at ${url}`); // eslint-disable-line no-console
    });
  })
  .catch(error => console.error(error));
