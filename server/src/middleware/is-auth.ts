import {MiddlewareFn, UnauthorizedError} from 'type-graphql';
import {MyContext} from '../utils/context';

export const isAuth: MiddlewareFn<MyContext> = async ({context}, next) => {
  const {user} = context;

  if (!user) {
    throw new UnauthorizedError();
  }

  return next();
};
