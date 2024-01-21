import { useMutation } from '@apollo/client';
import { gql } from 'graphql-tag';

interface SignInMutationData {
  authenticate: {
    // id: string;
    // email: string;
    jwtToken:string
  };
}

interface SignInMutationVariables {
  email: string;
  password: string;
}

const AUTHENTICATE = gql`
  mutation authenticate($email: String!, $password: String!) {
    authenticate(input: { email: $email, password: $password }) {
      jwtToken
    }
  }
`;
export const useSignInMutation = () => {
  return useMutation<SignInMutationData, SignInMutationVariables>(AUTHENTICATE);
};
