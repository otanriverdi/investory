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
      owner: context.user as string | undefined,
      ...fields,
    });

    position.instrument = await Instrument.findOneOrFail({
      where: {symbol: fields.symbol.toUpperCase()},
    });

    return position.save();
  }

  @Mutation(() => Position, {
    description: 'Updates a position. Cannot be used for closing positions',
  })
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

    const price = await getPrice(position.instrument);

    console.log(position);

    const close = ClosePrice.create({
      position,
      price: position.amount * price.current,
    });

    position.state = PositionState.CLOSED;
    await position.save();

    return close.save();
  }

  @Query(() => [Position], {
    description: 'Returns all positions that belongs to the logged in user.',
  })
  @UseMiddleware(isAuth)
  async getPositions(
    @Ctx() context: MyContext,
    @Arg('sortBy', {defaultValue: 'date'}) sortBy: 'date' | 'id' | 'price',
    @Arg('sortDirection', {defaultValue: 'DESC'}) sortDirection: 'ASC' | 'DESC',
  ): Promise<Position[]> {
    let orderBy;
    switch (sortBy) {
      case 'price':
        orderBy = {price: sortDirection};
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

    const close = await ClosePrice.findOne({position});
    if (!close) {
      console.warn(
        `Failed to get the closing price of the closed position ${position.id}. Marking the position as deleted to prevent bugs.`,
      );

      position.state = PositionState.DELETED;
      position.save();

      return null;
    }

    return await ClosePrice.findOneOrFail({position});
  }
}
