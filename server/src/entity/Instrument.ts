import {Field, ObjectType, registerEnumType} from 'type-graphql';
import {BaseEntity, Column, Entity, PrimaryColumn} from 'typeorm';
import {Price} from './Price';

export enum InstrumentType {
  CRYPTO = 'crypto',
  FX = 'fx',
  STOCK = 'stock',
}

registerEnumType(InstrumentType, {name: 'InstrumentType'});

@ObjectType()
@Entity()
export class Instrument extends BaseEntity {
  @Field()
  @PrimaryColumn()
  symbol: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({type: 'enum', enum: InstrumentType})
  type: InstrumentType;

  @Field(() => Price, {nullable: true})
  price?: Price;
}
