import {Field, Int, ObjectType} from 'type-graphql';
import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {Price} from './Price';

export enum InstrumentType {
  CRYPTO = 'crypto',
  FX = 'fx',
  STOCK = 'stock',
}

@ObjectType()
@Entity()
export class Instrument extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
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
