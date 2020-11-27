import 'reflect-metadata'; // required for typeorm
import {createConnection} from 'typeorm';

createConnection()
  .then(async connection => {
    // TODO add connection to graphql context.

    // SERVER LOGIC SHOULD BE HERE TO MAKE SURE IT RUNS AFTER THE CONNECTION

    console.log('Hello, world!');
  })
  .catch(error => console.error(error));
