import express from 'express';
import cors from 'cors';
import ws from 'ws';
import sequlizeConnection from 'sequleize/executeModels';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './trpc/appRouter';
import { createContext } from './trpc/index';
import { applyWSSHandler } from '@trpc/server/adapters/ws';
import { createServer } from 'http';
// import { EventEmitter } from 'events';

// const ee = new EventEmitter();
const app = express();

app.use(cors());
app.use(
  '/trpc',
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

const server = createServer(app);
const port = 5555;

applyWSSHandler({
  wss: new ws.Server({ server }),
  router: appRouter,
  createContext: createContext,
});
server.listen(port, () => {
  // ee.emit('add', true);
  console.log(`Listening at http://localhost:${port}/trpc`);
  sequlizeConnection();
});

server.on('error', console.error);
