import fetch from 'node-fetch';
import {Arg, FieldResolver, Query, Resolver, Root} from 'type-graphql';
import {Like} from 'typeorm';
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

  @Query(() => Instrument, {nullable: true})
  async getInstrumentBySymbol(
    @Arg('symbol') symbol: string,
  ): Promise<Instrument | undefined> {
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
