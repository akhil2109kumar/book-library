import { gql } from "@apollo/client";

export const SIGNUP_USER = gql`
  mutation SignupUser($input: SignUpInput!) {
    signupUser(input: $input) {
      user {
        id
        name
        email
        photo
        role
        createdAt
        updatedAt
      }
      status
    }
  }
`;

export const SIGNIN_USER = gql`
  mutation loginUser($input: LoginInput!) {
    loginUser(input: $input) {
        status
        access_token
    }
  }
`;

export const GET_PROFILE = gql`
query GetMe {
    getMe {
        status
        user {
            id
            name
            email
            photo
            role
            createdAt
            updatedAt
        }
    }
}`;
