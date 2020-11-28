import {ApolloServer} from 'apollo-server';
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

    server.listen().then(({url}) => {
      console.log(`🚀 Apollo server ready at ${url}`);
    });
  })
  .catch(error => console.error(error));
