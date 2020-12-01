import {Arg, Ctx, Mutation, Query, Resolver, UseMiddleware} from 'type-graphql';
import {Instrument} from '../entity/Instrument';
import {Position} from '../entity/Position';
import {isAuth} from '../middleware/is-auth';
import {MyContext} from '../utils/context';
import {CreatePositionInput, UpdatePositionInput} from '../utils/inputs';

@Resolver(Position)
export class PositionResolvers {
  @Mutation(() => Position)
  @UseMiddleware(isAuth)
  async createPosition(
    @Arg('fields') fields: CreatePositionInput,
    @Ctx() context: MyContext,
  ): Promise<Position> {
    const position = Position.create({
      owner: context.user!,
      ...fields,
    });

    position.instrument = await Instrument.findOneOrFail({
      where: {id: fields.instrumentId},
    });

    return position.save();
  }

  @Mutation(() => Position)
  @UseMiddleware(isAuth)
  async updatePosition(
    @Arg('id') id: number,
    @Arg('updates') updates: UpdatePositionInput,
  ): Promise<Position> {
    await Position.update(id, updates);

    return Position.findOneOrFail(id);
  }

  @Query(() => [Position])
  @UseMiddleware(isAuth)
  async getPositions(@Ctx() context: MyContext): Promise<Position[]> {
    return await Position.find({where: {owner: context.user}});
  }
}
