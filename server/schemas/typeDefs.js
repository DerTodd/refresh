const { gql } = require("apollo-server-express");

const typeDefs = gql`
type User{
    _id: ID
    username:String!
    firstname:String!
    lastname:String!
    title:String
    email:String!
    phones:[Array]
    password:String!
    bio:String
    picture:String
    date_joined:String
}

type Auth {
    token: ID!
    user: User
}

type Query{
    me: User
    users:[User]
    user(userid: ID!):User
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(
        username:String!, 
        firstname:String!, 
        lastname:String!, 
        title:String, 
        email:String!,
        phones:Array, 
        password:String!,
        bio:String,
        picture:String): Auth
    deleteUser(userId: ID!): User
}

`;
module.exports = typeDefs;