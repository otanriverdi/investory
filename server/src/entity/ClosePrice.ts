import {Field, ObjectType} from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {Position} from './Position';

@ObjectType()
@Entity()
export class ClosePrice extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Position, {onDelete: 'CASCADE'})
  @JoinColumn()
  position: Position;

  @Column()
  @Field()
  price: number;

  @CreateDateColumn()
  @Field()
  closedAt: Date;
}