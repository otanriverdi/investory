import fetch from 'node-fetch';
import {Arg, Query, Resolver} from 'type-graphql';
import {NewsItem} from '../entity/NewsItem';
import config from '../config';

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

    const {url} = config.iex;

    for (const symbol of symbols) {
      const res = await fetch(
        `${url}/stock/${symbol}/news/last/${last}?token=${token}`,
      );
      const json = await res.json();
      if (json) {
        const newsItems = json.map((d: any) => NewsItem.parseFields(d));
        news = news.concat(newsItems);
      }
    }
    return news;
  }
}
