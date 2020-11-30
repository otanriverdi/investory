import {Arg, FieldResolver, Query, Resolver} from 'type-graphql';
import {Like} from 'typeorm';
import {Instrument} from '../entity/Instrument';
import {Price} from '../entity/Price';

@Resolver(Instrument)
export class InstrumentResolvers {
  @Query(() => [Instrument])
  async getInstruments(
    @Arg('limit', {defaultValue: 10}) limit: number,
    @Arg('skip', {defaultValue: 0}) skip: number,
    @Arg('query', {defaultValue: ''}) query: string,
  ): Promise<Instrument[]> {
    const instruments = await Instrument.find({
      take: limit,
      skip,
      where: {symbol: Like(`%${query}%`)},
    });

    return instruments;
  }

  @Query(() => Instrument, {nullable: true})
  async getInstrumentById(
    @Arg('id') id: number,
  ): Promise<Instrument | undefined> {
    return await Instrument.findOneOrFail({where: {id: id}});
  }

  @FieldResolver()
  price(): Price {
    // TODO this should fetch and return the actual data from the API

    return {
      current: 106.59,
      history: [
        110.32,
        115.43,
        111.64,
        113.52,
        117.36,
        118.64,
        114.42,
        109.12,
        107.42,
      ],
    };
  }
}
