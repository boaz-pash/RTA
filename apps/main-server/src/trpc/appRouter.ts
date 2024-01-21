import { router } from ".";
import mutationsRouter from "./mutations";
import queriesRouter from "./queries";
import subscriptionsRouter from "./subscriptions";

export const appRouter = router({
    queries: queriesRouter,
    mutations: mutationsRouter,
    subscriptions: subscriptionsRouter,
  });
  
  export type AppRouter = typeof appRouter;