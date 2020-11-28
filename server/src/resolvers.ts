import {getConnection} from 'typeorm';
import {Position} from './entity/Position';

export const resolvers = {
  Query: {
    hello: async () => {
      return 'hi!';
    },

    positions: async (): Promise<Position[]> => {
      const connection = getConnection();
      const positions = connection
        .getRepository(Position)
        .find({relations: ['instrument']});
      return positions;
    },
  },
};
