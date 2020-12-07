import {Field, ObjectType} from 'type-graphql';

@ObjectType()
export class NewsItem {
  @Field()
  datetime: number;
  @Field()
  headline: string;
  @Field()
  source: string;
  @Field()
  url: string;
  @Field()
  summary: string;
  @Field()
  image: string;

  static parseFields(data: any): NewsItem {
    const {datetime, headline, source, url, summary, image} = data;
    return {datetime, headline, source, url, summary, image};
  }
}
