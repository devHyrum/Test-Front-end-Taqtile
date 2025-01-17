import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query Users($data: PageInput) {
    users(data: $data) {
      nodes {
        name
        email
        id
      }
      pageInfo {
        hasNextPage
        limit
        offset
      }
      count
    }
  }
`;

export const GET_USER = gql`
  query User($userId: ID) {
    user(id: $userId) {
      birthDate
      email
      id
      name
      phone
      role
    }
  }
`;
