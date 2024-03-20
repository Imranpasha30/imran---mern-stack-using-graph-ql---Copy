const userTypeDef = `#graphql
type User {
    _id:ID!
    username:String!
    email: String!
    address: String!
    city: String!
    phonenumber: String!
    password: String!
    program: String!
    favourite: String!
    isAdmin: Boolean
}
type Query{
    users:[User!]
    authUser:User
    user(userId:ID):User
}
type Mutation{
    signUp(input:SignUpInput!):User
    login(input:LoginInput!):User
    logout:LogoutResponse
}

input SignUpInput{
    username:String!
    email: String!
    address: String!
    city: String!
    phonenumber: String!
    password: String!
    program: String!
    favourite: String!
    isAdmin: Boolean
}

input LoginInput{
    username:String!
    password:String!
}

type LogoutResponse{
    message:String!
}
`

export default userTypeDef ;