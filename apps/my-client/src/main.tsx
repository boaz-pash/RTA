import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { client } from './utils/graphql/apollo';
import { ApolloProvider } from '@apollo/client'
import App from '../src/app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <BrowserRouter>
    <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
    </BrowserRouter>
  </StrictMode>
);
