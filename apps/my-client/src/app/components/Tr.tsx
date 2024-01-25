// import { subscribe } from 'diagnostics_channel';
import { trpc } from '../../utils/trpc';

const Tr: React.FC = () => {
  const eventQuery = trpc.queries.events.useQuery();
 
//  trpc.subscriptions.onAdd.useSubscription(undefined,{onData:
//   (data) => {
//     console.log("pub sub:",data);
//   }})




  // const user = trpc.queries.users.useQuery();

  // console.log(user.data);
  console.log(eventQuery.data);

  return (
    <div>
      <p>eeeee{}</p>
    </div>
  );
};

export default Tr;
