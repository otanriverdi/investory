import fetch from 'node-fetch';
import {Instrument} from '../entity/Instrument';
import {Price} from '../entity/Price';

export async function getPrice(instrument: Instrument): Promise<Price> {
  const token = process.env.IEX_TOKEN;

  let current = 0;
  let previous = 0;

  if (instrument.type === 'crypto') {
    const res = await fetch(
      `https://cloud.iexapis.com/stable/crypto/${instrument.symbol}/quote?token=${token}`,
    );

    const json = await res.json();

    current = json.latestPrice;
    previous = json.previousClose || json.latestPrice;
  } else if (instrument.type === 'stock') {
    const res = await fetch(
      `https://cloud-sse.iexapis.com/stable/stock/${instrument.symbol}/quote?token=${token}`,
    );

    const json = await res.json();

    current = json.latestPrice;
    previous = json.previousClose || json.latestPrice;
  }

  return {current, previous};
}
