import EventModel from 'sequleize/models/eventModel';
import { publicProcedure, router } from '.';
import UserModel from 'sequleize/models/userModel';
import { Ievent } from 'utils/eventType';
// import { EventEmitter } from 'events';

// const ee = new EventEmitter();

const queriesRouter = router({
  users: publicProcedure.query(async () => {
    const usersModels = await UserModel.findAll({});
    const usersArr = usersModels.map((userModel) => userModel.get());
    return usersArr;
  }),

  events: publicProcedure.query(async () => {
    const eventsModels = await EventModel.findAll({});
    const events: Ievent[] = eventsModels.map((eventModel) => eventModel.get());
    return events;
  }),

  eventsOfUser: publicProcedure.query(async (opts) => {
    const eventsModels = await EventModel.findAll({
      where: { user_id: opts.ctx.user },
    });
    const events: Ievent[] = eventsModels.map((eventModel) => eventModel.get());
    return events;
  }),
});

export default queriesRouter;
 