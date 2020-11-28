import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
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

@Entity()
export class Position {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', {precision: 19, scale: 8})
  amount: number;

  @Column('decimal', {precision: 19, scale: 4})
  price: number;

  // 3 letter abbreviation
  @Column('varchar', {length: 3, default: 'EUR'})
  currency: string;

  @Column('decimal', {precision: 19, scale: 4, default: 0})
  commission: number;

  @Column({type: 'enum', enum: PositionState, default: PositionState.OPEN})
  state: PositionState;

  @Column('timestamp with time zone', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  date: Date;

  @Column({type: 'enum', enum: PositionType, default: PositionType.BUY})
  type: PositionType;

  @ManyToOne(() => Instrument)
  instrument: Instrument;
}
