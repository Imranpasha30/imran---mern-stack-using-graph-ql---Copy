import {gql} from '@apollo/client';

 export const GET_AUTHENTICATED_USER = gql`
query GetAuthenticatedUser{
    authUser {
    _id
    username 
    profilePicture
    isAdmin
  }
}
`;

export const GET_ALL_USERS = gql`
query GetAllUsers {
  users {
    _id
    username
    email
    program
    profilePicture
  }
}
`

;