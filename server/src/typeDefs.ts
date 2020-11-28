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
    positions: [Position]
  }
  enum PositionState {
    open
    closed
    deleted
  }
  enum PositionType {
    sell
    buy
  }
  type Position {
    id: ID!
    amount: Float!
    price: Float!
    currency: String!
    commission: Float!
    state: PositionState!
    date: String!
    type: PositionType!
    instrument: Instrument!
  }
`;
