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
import AddressAutocomplete from '../utils/GeoapifyAutocompleteInput';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Layout from './components/Layout';
import Layot from './components/Layout';
import UserDashboard from './components/UserDashBooard';
import  Events  from './components/Events';
import LandingPage from './components/LandingPage';
import ListView from './components/ListView';
import GeoapifyAutocompleteInput from '../utils/GeoapifyAutocompleteInput';

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
              url: 'ws://localhost:5555/trpc',
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
        <Layot>
          <Routes>
          {/* <Route path="/" Component={LandingPage} /> */}
            <Route path="/" Component={HeroSection} />
            <Route path="/userdashboard" Component={UserDashboard} />
            <Route path="/create-event" Component={CreateEventForm} />
            <Route path="/events" Component={Events} />
            <Route path="/signup" Component={SignUp} />
            <Route path="/login" Component={SignIn} />
            <Route path="/map-view" Component={MapWithIcons} />
            <Route path="/list-view" Component={ListView} />
            <Route path="/adr" Component={GeoapifyAutocompleteInput} /> 
          </Routes>
        </Layot>

        <div>
          {/* <Navbar /> */}
          {/* <HeroSection /> */}
          {/* Add more sections as needed */}
        </div>
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default App;
