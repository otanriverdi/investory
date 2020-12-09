import fetch from 'node-fetch';
import {
  Arg,
  FieldResolver,
  Query,
  registerEnumType,
  Resolver,
  Root,
} from 'type-graphql';
import {Like} from 'typeorm';
import {Instrument} from '../entity/Instrument';
import {InstrumentHistory} from '../entity/InstrumentHistory';
import {Price} from '../entity/Price';
import {getPrice} from '../utils/get-price';
import config from '../config';

export enum Duration {
  Y5 = '5y',
  Y2 = '2y',
  Y1 = '1y',
  YTD = 'ytd',
  M6 = '6m',
  M3 = '3m',
  M1 = '1m',
}

registerEnumType(Duration, {name: 'Duration'});

@Resolver(Instrument)
export class InstrumentResolvers {
  @Query(() => [Instrument], {
    description: 'Returns all instruments filtered by the optional arguments.',
  })
  async getInstruments(
    @Arg('limit', {defaultValue: 10}) limit: number,
    @Arg('skip', {defaultValue: 0}) skip: number,
    @Arg('query', {defaultValue: ''}) query: string,
    @Arg('sortBy', {defaultValue: 'symbol'}) sortBy: 'name' | 'symbol',
    @Arg('sortDirection', {defaultValue: 'DESC'}) sortDirection: 'ASC' | 'DESC',
  ): Promise<Instrument[]> {
    let orderBy;
    switch (sortBy) {
      case 'name':
        orderBy = {name: sortDirection};
        break;
      default:
        orderBy = {symbol: sortDirection};
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

    const {url} = config.iex;

    const res = await fetch(
      `${url}/stock/${symbol}/chart/${duration}?token=${token}`,
    );

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
