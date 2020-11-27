import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

enum InstrumentType {
  CRYPTO = 'crypto',
  FX = 'fx',
  STOCK = 'stock',
}

@Entity()
export class Instrument {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  symbol: string;

  @Column()
  name: string;

  @Column({type: 'enum', enum: InstrumentType})
  type: InstrumentType;
}
