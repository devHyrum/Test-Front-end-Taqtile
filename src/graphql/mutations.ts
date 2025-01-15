import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      token
    }
  }
`;

export const CREATE_MUTATION = gql`
  mutation CreateUser($data: UserInput!) {
    createUser(data: $data) {
      birthDate
      email
      id
      name
      phone
      role
    }
  }
`;
