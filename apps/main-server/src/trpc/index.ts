import { initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import decodeAndVerifyJwtToken from './jwtHandler';
// import { BecodedToken } from 'utils/becodedToken';
import { JwtPayload } from 'jsonwebtoken';
// const t = initTRPC.create();

export const createContext = async ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  const getUserFromHeader = async () => {
    if (req.headers.authorization) {
      const user: string | JwtPayload = await decodeAndVerifyJwtToken(
        req.headers.authorization
      );
      return user.person_id;
    } 
    return null;
  };
  const user = await getUserFromHeader();
  console.log(user);

  return {
    user,
  };
};
type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create();
export const router = t.router;
export const publicProcedure = t.procedure;
