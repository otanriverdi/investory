import fetch from 'node-fetch';
import {Arg, Query, Resolver} from 'type-graphql';
import {NewsItem} from '../entity/NewsItem';

@Resolver()
export class NewsResolvers {
  @Query(() => [NewsItem], {
    description: 'Returns latests news articles for the provided symbol.',
  })
  async getNewsForSymbol(
    @Arg('symbols', type => [String]) symbols: string[],
    @Arg('last', {defaultValue: 1}) last: number,
  ): Promise<NewsItem[] | null> {
    const token = process.env.IEX_TOKEN;

    let news: NewsItem[] = [];

    for (const symbol of symbols) {
      let url = `https://sandbox.iexapis.com/stable/stock/${symbol}/news/last/${last}?token=${token}`;

      if (process.env.ENABLE_IEX === 'true') {
        console.warn('Using IEX to fetch real price data!');

        url = `https://cloud.iexapis.com/stable/stock/${symbol}/news/last/${last}?token=${token}`;
      }

      const res = await fetch(url);
      const json = await res.json();
      if (json) {
        const newsItems = json.map((d: any) => NewsItem.parseFields(d));
        news = news.concat(newsItems);
      }
    }
    return news;
  }
}
