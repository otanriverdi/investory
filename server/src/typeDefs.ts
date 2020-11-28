import {gql} from 'apollo-server';

export const typeDefs = gql`
  type InstrumentType {
    crypto: String!
    fx: String!
    stock: String!
  }
  type Instrument {
    id: ID!
    symbol: String!
    name: String!
    type: [InstrumentType]!
  }
  type Query {
    hello: String
  }
`;
