import {getConnection} from 'typeorm';
import {Instrument} from './entity/Instrument';
import {Position} from './entity/Position';

export const resolvers = {
  Query: {
    hello: async (_: any, __: any, ctx: any) => {
      return 'hi!';
    },

    positions: async (): Promise<Position[]> => {
      const connection = getConnection();
      const positions = connection
        .getRepository(Position)
        .find({relations: ['instrument']});
      return positions;
    },

    instruments: async (): Promise<Instrument[]> => {
      const connection = getConnection();
      const instruments = connection.getRepository(Instrument).find();
      return instruments;
    },

    instrument: async (_: any, args: any): Promise<Instrument> => {
      const {symbol} = args;
      const connection = getConnection();
      const instrument = await connection
        .getRepository(Instrument)
        .find({where: {symbol: symbol}});
      return instrument[0];
    },

    instrumentById: async (_: any, args: any): Promise<Instrument | null> => {
      const {id} = args;
      const connection = getConnection();
      const instrument =
        (await connection.getRepository(Instrument).findOne(id)) || null;
      return instrument;
    },
  },
};
