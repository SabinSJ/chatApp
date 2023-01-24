import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation register($input: RegisterInput) {
    register(input: $input) {
      status
      message
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($input: LoginInput) {
    login(input: $input) {
      status
      message
    }
  }
`;

export const GET_USERS = gql`
  query getUsers {
    getUsers {
      username
      email
    }
  }
`;
