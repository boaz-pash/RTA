import { eventSchema } from '../zVelidation';
import { publicProcedure, router } from '.';
import EventModel from '../sequleize/models/eventModel';
import convertAddressToCord from 'utils/convertAddressToCord';
// import { EventEmitter } from 'events';
import { ee } from './subscriptions';
import { Ievent } from 'utils/eventType';

const mutationsRouter = router({
  createEvent: publicProcedure.input(eventSchema).mutation(async (opts) => {
    try {
      const user = opts.ctx.user;
      const createdEvent = await EventModel.create({
        ...opts.input,
        event_cord: await convertAddressToCord(opts.input.event_location),
        user_id: user,
        created_at: new Date(),
        updated_at: new Date(),
      });
            const event: Ievent = createdEvent.get();
      ee.emit('sss', event);
      return createdEvent.toJSON();
    } catch (error) {
      console.error('Error creating event:', error);
      throw new Error('Failed to create event');
    }
  }),
});

export default mutationsRouter;
