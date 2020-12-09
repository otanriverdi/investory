import fetch from 'node-fetch';
import {Instrument} from '../entity/Instrument';
import {Price} from '../entity/Price';
import config from '../config';

export async function getPrice(instrument: Instrument): Promise<Price> {
  const token = process.env.IEX_TOKEN;

  const {url} = config.iex;

  if (instrument.type === 'crypto') {
    const res = await fetch(
      `${url}/crypto/${instrument.symbol.toUpperCase()}/quote?token=${token}`,
    );

    const json = await res.json();

    return {
      current: json.latestPrice,
      previous: json.previousClose || json.latestPrice,
    };
  } else {
    const res = await fetch(
      `${url}/stock/${instrument.symbol.toUpperCase()}/quote?token=${token}`,
    );

    const json = await res.json();

    return {
      current: json.latestPrice,
      previous: json.previousClose || json.latestPrice,
    };
  }
}
