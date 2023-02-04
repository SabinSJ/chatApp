import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query getUsers {
    getUsers {
      username
      email
    }
  }
`;

export const GET_PERSONAL_DATA = gql`
  query getPersonalData($id: Int) {
    getPersonalData(id: $id) {
      profileImage
      name
      username
      bio
      email
      gender
    }
  }
`;

export const GET_PROFILE_PICTURE = gql`
  query getProfilePicture($id: Int) {
    getProfilePicture(id: $id) {
      profileImage
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($input: UpdateInput) {
    updateUser(input: $input) {
      status
      message
    }
  }
`;

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
