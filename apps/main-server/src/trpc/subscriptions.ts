import { publicProcedure, router } from '.';
import { observable } from '@trpc/server/observable';
import { EventEmitter } from 'events';
import { Ievent } from 'utils/eventType';
// import { Ievent } from 'utils/eventType';

export const ee = new EventEmitter();

const subscriptionsRouter = router({
  onAdd: publicProcedure.subscription(() => {
    return observable<Ievent>((emit) => {
      ee.on('sss', emit.next);
      // console.log('subscription');
      return () => {
        ee.off('sss', emit.next);
      };
    });
  }),
});
export default subscriptionsRouter;
