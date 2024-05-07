import { gql } from "@apollo/client";

export const SIGN_UP = gql`
	mutation SignUp($input: SignUpInput!) {
    signUp(input: $input) {
      address
      city
      email
      favourite
      gender
      isAdmin
      password
      phonenumber
      profilePicture
      program
      username
    }
  }
`;
export const LOGIN = gql`
mutation Login($input: LoginInput!) {
  login(input: $input) {
    _id
    email
    password
  }
}
`
export const LOGOUT = gql`
    mutation Logout {
  logout {
    message
  }
}

`




