import express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import cors from 'cors';
import sequlizeConnection from 'sequleize/executeModels';
import { appRouter } from './trpc/appRouter';
import { createContext } from './trpc/index';

const app = express();

app.use(cors());
app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext
  })
);

const port = 5555;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/trpc`);
  sequlizeConnection();
});
server.on('error', console.error);
