import {Arg, Query, Resolver} from 'type-graphql';
import {Instrument} from '../entity/Instrument';

@Resolver()
export class InstrumentResolvers {
  @Query(() => String)
  async hello(): Promise<string> {
    return 'Hello World';
  }

  @Query(() => [Instrument], {nullable: true})
  async instruments(): Promise<Instrument[] | null> {
    const instruments = await Instrument.find();
    return instruments;
  }

  @Query(() => Instrument, {nullable: true})
  async instrumentBySymbol(
    @Arg('symbol') symbol: string,
  ): Promise<Instrument | null> {
    const instrument = await Instrument.find({where: {symbol: symbol}});
    return instrument[0];
  }

  @Query(() => Instrument, {nullable: true})
  async instrumentById(@Arg('id') id: number): Promise<Instrument | null> {
    const instrument = await Instrument.find({where: {id: id}});
    return instrument[0];
  }
}
