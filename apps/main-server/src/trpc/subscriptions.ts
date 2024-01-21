import { publicProcedure, router } from '.';

const subscriptionsRouter = router({
  subscriptionExample: publicProcedure.subscription(() => {
    return 'should create an event';
  }),
});
export default subscriptionsRouter;