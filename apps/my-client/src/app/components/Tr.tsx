import { trpc } from '../../utils/trpc';

const Tr: React.FC = () => {

  const eventQuery = trpc.queries.eventsOfUser.useQuery();

  const user = trpc.queries.users.useQuery();

  console.log(user.data);
  console.log(eventQuery.data);

  return (
    <div>
      <p>eeeee{}</p>
    </div>
  ); 
};

export default Tr;
