import {Field, ObjectType} from 'type-graphql';

@ObjectType({
  description: 'Holds the current and the previous price of an instrument.',
})
export class Price {
  @Field()
  current: number;

  @Field()
  previous: number;
}
