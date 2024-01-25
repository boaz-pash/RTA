import { initTRPC } from '@trpc/server';
import { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import decodeAndVerifyJwtToken from './jwtHandler';
import { JwtPayload } from 'jsonwebtoken';
import { NodeHTTPCreateContextFnOptions } from '@trpc/server/dist/adapters/node-http/types';

export const createContext = async <TRequest, TResponse>(
  opts: NodeHTTPCreateContextFnOptions<TRequest, TResponse>
) => {
  const getUserFromHeader = async (req) => {
    if (req.headers.authorization) {
      const user: string | JwtPayload = await decodeAndVerifyJwtToken(
        req.headers.authorization
      );
      return user.person_id;
    }
    return null;
  };
  const user = await getUserFromHeader(opts.req);
  // console.log(user);
  return {
    user,
  };
};
// export const createContext = <TRequest, TResponse>(
//   opts: NodeHTTPCreateContextFnOptions<TRequest, TResponse>,
// ) => {
//   return {
//     ...ctx,
//     req: opts.req,
//     ws: opts.res instanceof WebSocket ? opts.res : undefined,
//   };
// };
type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create();
export const router = t.router;
export const publicProcedure = t.procedure;
