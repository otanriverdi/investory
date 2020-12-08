import fetch from 'node-fetch';
import {Instrument} from '../entity/Instrument';
import {Price} from '../entity/Price';

export async function getPrice(instrument: Instrument): Promise<Price> {
  const token = process.env.IEX_TOKEN;

  let current;
  let previous;

  let url = 'https://sandbox.iexapis.com/stable';

  if (process.env.ENABLE_IEX === 'true') {
    console.warn('Using IEX to fetch real price data!');

    url = 'https://cloud.iexapis.com/stable';
  }

  if (instrument.type === 'crypto') {
    const res = await fetch(
      `${url}/crypto/${instrument.symbol.toUpperCase()}/quote?token=${token}`,
    );

    const json = await res.json();

    current = json.latestPrice;
    previous = json.previousClose || json.latestPrice;
  } else if (instrument.type === 'stock') {
    const res = await fetch(
      `${url}/stock/${instrument.symbol.toUpperCase()}/quote?token=${token}`,
    );

    const json = await res.json();

    current = json.latestPrice;
    previous = json.previousClose || json.latestPrice;
  }

  return {current, previous};
}
