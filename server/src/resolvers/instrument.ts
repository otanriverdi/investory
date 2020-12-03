import fetch from 'node-fetch';
import {Arg, FieldResolver, Query, Resolver, Root} from 'type-graphql';
import {Like} from 'typeorm';
import {getPrice} from '../utils/get-price';
import {Instrument} from '../entity/Instrument';
import {InstrumentHistory} from '../entity/InstrumentHistory';
import {Price} from '../entity/Price';

export enum Duration {
  Y5 = '5y',
  Y2 = '2y',
  Y1 = '1y',
  YTD = 'ytd',
  M6 = '6m',
  M3 = '3m',
  M1 = '1m',
}

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

  @Query(() => Instrument)
  async getInstrumentById(@Arg('id') id: number): Promise<Instrument> {
    return await Instrument.findOneOrFail({where: {id: id}});
  }

  @Query(() => Instrument)
  async getInstrumentBySymbol(
    @Arg('symbol') symbol: string,
  ): Promise<Instrument> {
    return await Instrument.findOneOrFail({where: {symbol}});
  }

  @Query(() => [InstrumentHistory], {nullable: true})
  async getInstrumentHistory(
    @Arg('symbol') symbol: string,
    @Arg('duration', {defaultValue: '1m'}) duration: Duration,
  ): Promise<InstrumentHistory[] | null> {
    const token = process.env.IEX_TOKEN;
    let url = `https://sandbox.iexapis.com/stable/stock/${symbol}/chart/${duration}?token=${token}`;

    if (process.env.ENABLE_IEX === 'true') {
      console.warn('Using IEX to fetch real price data!');
      url = `https://cloud-sse.iexapis.com/stable/stock/${symbol}/chart/${duration}?token=${token}`;
    }

    const res = await fetch(url);
    const json = await res.json();
    if (json) {
      const history = json.map((d: unknown) =>
        InstrumentHistory.parseFields(d),
      );
      return history;
    }
    return null;
  }

  @FieldResolver()
  async price(@Root() instrument: Instrument): Promise<Price> {
    if (process.env.ENABLE_IEX === 'true') {
      console.warn('Using IEX to fetch real price data!');

      return await getPrice(instrument);
    } else {
      return {current: 150, previous: 153};
    }
  }
}
