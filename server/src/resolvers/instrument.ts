import {Arg, FieldResolver, Query, Resolver, Root} from 'type-graphql';
import {Like} from 'typeorm';
import {Instrument} from '../entity/Instrument';
import {Price} from '../entity/Price';
import fetch from 'node-fetch';

@Resolver(Instrument)
export class InstrumentResolvers {
  @Query(() => [Instrument])
  async getInstruments(
    @Arg('limit', {defaultValue: 10}) limit: number,
    @Arg('skip', {defaultValue: 0}) skip: number,
    @Arg('query', {defaultValue: ''}) query: string,
    @Arg('sortBy', {defaultValue: 'id'}) sortBy: 'id' | 'name' | 'symbol',
    @Arg('sortDirection', {defaultValue: 'ASC'}) sortDirection: 'ASC' | 'DESC',
  ): Promise<Instrument[]> {
    let orderBy;
    switch (sortBy) {
      case 'name':
        orderBy = {name: sortDirection};
        break;
      case 'symbol':
        orderBy = {symbol: sortDirection};
        break;
      default:
        orderBy = {id: sortDirection};
        break;
    }

    const instruments = await Instrument.find({
      take: limit,
      skip,
      where: {symbol: Like(`%${query}%`)},
      order: orderBy,
    });

    return instruments;
  }

  @Query(() => Instrument, {nullable: true})
  async getInstrumentById(
    @Arg('id') id: number,
  ): Promise<Instrument | undefined> {
    return await Instrument.findOneOrFail({where: {id: id}});
  }

  @Query(() => Instrument, {nullable: true})
  async getInstrumentBySymbol(
    @Arg('symbol') symbol: string,
  ): Promise<Instrument | undefined> {
    return await Instrument.findOneOrFail({where: {symbol}});
  }

  @FieldResolver()
  async price(@Root() instrument: Instrument): Promise<Price> {
    const token = process.env.IEX_TOKEN;

    let current = 150;
    let previous = 145;

    if (process.env.ENABLE_IEX === 'true') {
      console.warn('Using IEX to fetch real price data!');

      if (instrument.type === 'crypto') {
        const res = await fetch(
          `https://cloud-sse.iexapis.com/stable/crypto/${instrument.symbol}/quote?token=${token}`,
        );

        const json = await res.json();

        current = json.latestPrice;
        previous = json.previousClose;
      } else if (instrument.type === 'stock') {
        const res = await fetch(
          `https://cloud-sse.iexapis.com/stable/stock/${instrument.symbol}/quote?token=${token}`,
        );

        const json = await res.json();

        current = json.latestPrice;
        previous = json.previousClose;
      }
    }

    return {
      current,
      previous,
    };
  }
}
