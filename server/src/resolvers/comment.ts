import {UserInputError} from 'apollo-server-express';
import {Arg, Ctx, Mutation, Query, Resolver, UseMiddleware} from 'type-graphql';
import {CreateCommentInput} from '../utils/inputs';
import {Comment} from '../entity/Comment';
import {Instrument} from '../entity/Instrument';
import {isAuth} from '../middleware/is-auth';
import {MyContext} from '../utils/context';

@Resolver(Comment)
export class CommentResolvers {
  @Query(() => [Comment], {
    description: 'Get all comments made on the provided symbol.',
  })
  async getComments(@Arg('symbol') symbol: string): Promise<Comment[]> {
    const instrument = await Instrument.findOneOrFail({
      where: {symbol: symbol.toUpperCase()},
    });

    return Comment.find({where: {instrument}});
  }

  @Mutation(() => Comment)
  @UseMiddleware(isAuth)
  async createComment(
    @Arg('fields') fields: CreateCommentInput,
    @Arg('symbol') symbol: string,
    @Ctx() context: MyContext,
  ): Promise<Comment> {
    const {body} = fields;
    const {user} = context;

    if (body.length < 5) {
      throw new UserInputError('Body too short.');
    }

    const instrument = await Instrument.findOneOrFail({
      where: {symbol: symbol.toUpperCase()},
    });

    const comment = Comment.create({
      ...fields,
      owner: user as string | undefined,
    });
    comment.instrument = instrument;

    return comment.save();
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteComment(
    @Arg('id') id: number,
    @Ctx() context: MyContext,
  ): Promise<boolean> {
    const {user} = context;

    const comment = await Comment.findOneOrFail({
      where: {id, owner: user},
    });

    await Comment.remove(comment);

    return true;
  }
}
