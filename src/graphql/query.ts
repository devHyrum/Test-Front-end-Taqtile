import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query Users($data: PageInput) {
    users(data: $data) {
      nodes {
        name
        email
        id
      }
    }
  }
`;
