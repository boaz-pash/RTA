// import styles from './app.module.css';
import { Route, Routes } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
// import ExampleComponent from './components/Tr';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { useState } from 'react';
import { trpc } from '../utils/trpc';
import CreateEventForm from './components/CreateEvent';
import Tr from './components/Tr';
import Interactions from './components/Map';
import Map2 from './components/Map2';
// import Popups from './components/Map';

const App = () => {

  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:5555/trpc',
          headers() {
            return {
              authorization: localStorage.getItem('token')?.toString()
            };
          },
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
          <Route path="/" Component={SignUp} />
          <Route path="/signin" Component={SignIn} />
          <Route path="/map" Component={Map2} />
        </Routes>
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default App;
