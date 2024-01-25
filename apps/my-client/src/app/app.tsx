import { Route, Routes } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createWSClient, httpBatchLink, splitLink, wsLink } from '@trpc/client';
import { useState } from 'react';
import { trpc } from '../utils/trpc';
import CreateEventForm from './components/CreateEvent';
import Tr from './components/Tr';
import MapWithIcons from './components/Map';
import AddressAutocomplete from '../utils/AddressAutocomplete';

const App = () => {

  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>

    trpc.createClient({
      links: [
        splitLink({
          condition: (op) => {
            return op.type === 'subscription';
          },
          true: wsLink({
            client: createWSClient({
              url: "ws://localhost:5555/trpc",
            }),          
          }),
          false: httpBatchLink({
            url: 'http://localhost:5555/trpc',
            headers() {
              return {
                authorization: localStorage.getItem('token')?.toString(),
              };
            },
          }),
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/pp" Component={CreateEventForm} />
          <Route path="/events" Component={Tr} />
          <Route path="/signup" Component={SignUp} />
          <Route path="/signin" Component={SignIn} />
          <Route path="/map" Component={MapWithIcons} />
          {/* <Route path="/adr" Component={AddressAutocomplete} /> */}
        </Routes>
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default App;
