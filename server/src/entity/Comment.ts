import {Field, ObjectType} from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {Instrument} from './Instrument';

@ObjectType()
@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Instrument)
  @ManyToOne(() => Instrument, {onDelete: 'CASCADE'})
  instrument: Instrument;

  @Field()
  @Column()
  owner: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @Column()
  body: string;
}
