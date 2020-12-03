import {Field, InputType} from 'type-graphql';
import {PositionState, PositionType} from '../entity/Position';

@InputType()
export class CreatePositionInput {
  @Field()
  amount: number;

  @Field()
  price: number;

  @Field({nullable: true, defaultValue: 'USD'})
  currency: string;

  @Field({nullable: true})
  commission: number;

  @Field({nullable: true})
  date: Date;

  @Field()
  instrumentId: number;

  @Field(() => PositionType, {nullable: true})
  type: PositionType;
}

@InputType()
export class UpdatePositionInput {
  @Field({nullable: true})
  amount: number;

  @Field({nullable: true})
  price: number;

  @Field({nullable: true})
  commission: number;

  @Field({nullable: true})
  date: Date;

  @Field(() => PositionType, {nullable: true})
  type: PositionType;

  @Field(() => PositionState, {nullable: true})
  state: PositionState;
}
