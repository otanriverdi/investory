import {gql} from 'apollo-server';

export const typeDefs = gql`
  enum InstrumentType {
    crypto
    fx
    stock
  }
  type Instrument {
    id: ID!
    symbol: String!
    name: String!
    type: InstrumentType!
  }
  type Query {
    hello: String
    positions: [Position]
    instruments: [Instrument]
    instrument(symbol: String): Instrument
    instrumentById(id: Int): Instrument
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
