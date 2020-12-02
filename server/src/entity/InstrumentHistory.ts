import {Field, ObjectType} from 'type-graphql';

@ObjectType()
export class InstrumentHistory {
  @Field()
  close: number;

  @Field()
  high: number;

  @Field()
  low: number;

  @Field()
  open: number;

  @Field()
  volume: number;

  @Field()
  date: Date;

  static parseFields(obj: any): InstrumentHistory {
    const {close, high, low, open, volume} = obj as InstrumentHistory;

    const ret = {
      close,
      high,
      low,
      open,
      volume,
      date: new Date(Date.parse(obj.date)),
    };
    return ret;
  }
}
