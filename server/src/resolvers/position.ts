import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from 'type-graphql';
import {Not} from 'typeorm';
import {ClosePrice} from '../entity/ClosePrice';
import {Instrument} from '../entity/Instrument';
import {Position, PositionState} from '../entity/Position';
import {isAuth} from '../middleware/is-auth';
import {MyContext} from '../utils/context';
import {getPrice} from '../utils/get-price';
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
      where: {symbol: fields.symbol},
    });

    return position.save();
  }

  @Mutation(() => Position)
  @UseMiddleware(isAuth)
  async updatePosition(
    @Arg('id') id: number,
    @Arg('updates') updates: UpdatePositionInput,
  ): Promise<Position> {
    if (updates.state === PositionState.CLOSED) {
      throw new Error(
        'Cant close positions. Use `closePositions` mutation instead.',
      );
    }

    await Position.update(id, updates);

    return Position.findOneOrFail(id);
  }

  @Mutation(() => ClosePrice)
  @UseMiddleware(isAuth)
  async closePosition(@Arg('id') id: number): Promise<ClosePrice> {
    const position = await Position.findOneOrFail(id);

    if (position.state === PositionState.CLOSED) {
      throw new Error('Position already closed.');
    }

    position.state = PositionState.CLOSED;
    await position.save();

    const price = await getPrice(position.instrument);

    const close = ClosePrice.create({
      position,
      price: position.amount * price.current,
    });

    return close.save();
  }

  @Query(() => [Position])
  @UseMiddleware(isAuth)
  async getPositions(
    @Ctx() context: MyContext,
    @Arg('sortBy', {defaultValue: 'date'}) sortBy: 'date' | 'id' | 'price',
    @Arg('sortDirection', {defaultValue: 'ASC'}) sortDirection: 'ASC' | 'DESC',
  ): Promise<Position[]> {
    let orderBy;
    switch (sortBy) {
      case 'price':
        orderBy = {price: sortDirection};
        break;
      case 'id':
        orderBy = {id: sortDirection};
        break;
      default:
        orderBy = {date: sortDirection};
        break;
    }

    const positions = await Position.find({
      where: {owner: context.user, state: Not(PositionState.DELETED)},
      order: orderBy,
    });

    return positions;
  }

  @FieldResolver()
  async closePrice(@Root() position: Position): Promise<ClosePrice | null> {
    if (position.state !== PositionState.CLOSED) {
      return null;
    }

    return await ClosePrice.findOneOrFail({position});
  }
}
