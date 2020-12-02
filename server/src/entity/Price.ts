import {Field, ObjectType} from 'type-graphql';

// TODO convert to entity
@ObjectType()
export class Price {
  @Field()
  current: number;

  @Field()
  previous: number;
}
