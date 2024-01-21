// apollo.ts
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Create an HTTP link to your GraphQL server
const httpLink = createHttpLink({
  uri: 'http://localhost:7777/graphql',
});

// Set the authorization context if needed (e.g., JWT token)
const authLink = setContext((_, { headers }) => {
  // Add authentication headers here if required
  return {
    headers: {
      ...headers,
      // Authorization: `Bearer YOUR_ACCESS_TOKEN`,
    },
  };
});

// Create an Apollo Client instance with the HTTP link and optional auth link



  
  // const authLink = setContext((_, { headers }) => {
  //   // get the authentication token from wherever you store it
  //   const token = getJWTToken();
  //   // return the headers to the context so httpLink can read them
  //   return {
  //     headers: {
  //       ...headers,
  //       // Only pass the authorization header if we have a JWT
  //       ...(token ? { authorization: `Bearer ${token}` } : null),
  //     },
  //   };
  // });

  export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });