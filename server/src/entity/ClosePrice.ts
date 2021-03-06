import {Field, Float, ObjectType} from 'type-graphql';
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

@ObjectType({
  description: 'Holds the balance of the position at the closing time.',
})
@Entity()
export class ClosePrice extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Position, {onDelete: 'CASCADE'})
  @JoinColumn()
  position: Position;

  @Column('decimal', {precision: 19, scale: 4})
  @Field(() => Float)
  price: number;

  @CreateDateColumn()
  @Field()
  closedAt: Date;
}
