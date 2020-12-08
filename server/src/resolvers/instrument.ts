import fetch from 'node-fetch';
import {Arg, FieldResolver, Query, Resolver, Root} from 'type-graphql';
import {Like} from 'typeorm';
import {Instrument} from '../entity/Instrument';
import {InstrumentHistory} from '../entity/InstrumentHistory';
import {Price} from '../entity/Price';
import {getPrice} from '../utils/get-price';

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
    @Arg('sortBy', {defaultValue: 'symbol'}) sortBy: 'id' | 'name' | 'symbol',
    @Arg('sortDirection', {defaultValue: 'DESC'}) sortDirection: 'ASC' | 'DESC',
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
      where: {symbol: Like(`%${query.toUpperCase()}%`)},
      order: orderBy,
    });

    return instruments;
  }

  @Query(() => Instrument)
  async getInstrumentBySymbol(
    @Arg('symbol') symbol: string,
  ): Promise<Instrument> {
    return await Instrument.findOneOrFail({
      where: {symbol: symbol.toUpperCase()},
    });
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

      url = `https://cloud.iexapis.com/stable/stock/${symbol}/chart/${duration}?token=${token}`;
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
  async price(@Root() instrument: Instrument): Promise<Price | null> {
    try {
      const price = await getPrice(instrument);

      return price;
    } catch (error) {
      console.error(error);

      return null;
    }
  }
}
