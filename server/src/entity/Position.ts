import {Field, ObjectType, registerEnumType} from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {Instrument} from './Instrument';

export enum PositionState {
  OPEN = 'open',
  CLOSED = 'closed',
  DELETED = 'deleted',
}

export enum PositionType {
  SELL = 'sell',
  BUY = 'buy',
}

registerEnumType(PositionState, {
  name: 'PositionState',
});

registerEnumType(PositionType, {
  name: 'PositionType',
});

@ObjectType()
@Entity()
export class Position extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('decimal', {precision: 19, scale: 8})
  amount: number;

  @Field()
  @Column('decimal', {precision: 19, scale: 4})
  price: number;

  // 3 letter abbreviation
  @Field()
  @Column('varchar', {length: 3, default: 'USD'})
  currency: string;

  @Field()
  @Column('decimal', {precision: 19, scale: 4, default: 0})
  commission: number;

  @Field(() => PositionState)
  @Column({type: 'enum', enum: PositionState, default: PositionState.OPEN})
  state: PositionState;

  @Field()
  @Column('timestamp with time zone', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  date: Date;

  @Field(() => PositionType)
  @Column({type: 'enum', enum: PositionType, default: PositionType.BUY})
  type: PositionType;

  @Field(() => Instrument)
  @ManyToOne(() => Instrument, {onDelete: 'CASCADE', eager: true})
  instrument: Instrument;

  @Column()
  owner: string;
}
