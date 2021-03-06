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
  @Field()
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

  @Field()
  @Column()
  username: string;

  @Field()
  @Column()
  image: string;
}
