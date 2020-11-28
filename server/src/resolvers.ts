import {Query} from 'typeorm/driver/Query';
import {Instrument} from './entity/Instrument';

export const resolvers = {
  Query: {
    hello: async () => {
      return 'hi!';
    },
  },
};
