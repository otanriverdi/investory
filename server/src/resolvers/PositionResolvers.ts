import {FieldResolver, Query, Resolver, Root} from 'type-graphql';
import {getConnection} from 'typeorm';
import {Instrument} from '../entity/Instrument';
import {Position} from '../entity/Position';

@Resolver(of => Position)
export class PositionResolvers {
  @Query(() => [Position], {nullable: true})
  async positions(): Promise<Position[] | null> {
    return await Position.find();
  }

  @FieldResolver()
  async instrument(@Root() position: Position): Promise<Instrument | null> {
    const instrument = await getConnection()
      .getRepository(Instrument)
      .findOne(position.instrument);
    if (!instrument)
      throw new Error(
        `Error retrieving instrument for instrument ID : ${position.instrument}`,
      );
    return instrument;
  }
}
