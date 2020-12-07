import {UserInputError} from 'apollo-server-express';
import {Arg, Ctx, Mutation, Query, Resolver, UseMiddleware} from 'type-graphql';
import {Comment} from '../entity/Comment';
import {Instrument} from '../entity/Instrument';
import {isAuth} from '../middleware/is-auth';
import {MyContext} from '../utils/context';

@Resolver(Comment)
export class CommentResolvers {
  @Mutation(() => Comment)
  @UseMiddleware(isAuth)
  async createComment(
    @Arg('symbol') symbol: string,
    @Arg('body') body: string,
    @Arg('username') username: string,
    @Arg('image') image: string,
    @Ctx() context: MyContext,
  ): Promise<Comment> {
    if (body.length < 8) {
      throw new UserInputError('Body too short.');
    }

    const {user} = context;

    const instrument = await Instrument.findOneOrFail({
      where: {symbol: symbol.toUpperCase()},
    });

    const comment = Comment.create({body, owner: user!, username, image});
    comment.instrument = instrument;

    return comment.save();
  }

  @Query(() => [Comment])
  async getComments(@Arg('symbol') symbol: string): Promise<Comment[]> {
    const instrument = await Instrument.findOneOrFail({
      where: {symbol: symbol.toUpperCase()},
    });

    return Comment.find({where: {instrument}});
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteComment(
    @Arg('id') id: number,
    @Ctx() context: MyContext,
  ): Promise<boolean> {
    const comment = await Comment.findOneOrFail({
      where: {id, owner: context.user},
    });

    await Comment.remove(comment);

    return true;
  }
}
