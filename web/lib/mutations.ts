import { gql } from 'graphql-request';

export const MANAGER_LOGIN = gql`
  mutation ManagerLogin($email: String!, $password: String!) {
    managerLogin(email: $email, password: $password) {
      accessToken
      user
    }
  }
`;

export const CREATE_MANAGER = gql`
  mutation CreateManager($email: String!, $password: String!, $name: String!) {
    createManager(email: $email, password: $password, name: $name) {
      accessToken
      user
    }
  }
`;
