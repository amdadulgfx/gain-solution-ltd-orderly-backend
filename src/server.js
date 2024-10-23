require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const { validateToken } = require("./utils/authService");
import { AuthenticationError } from "apollo-server";
import gql from 'graphql-tag';
import _ from 'lodash';
import {
    faqResolver, baseResolver,
    userResolver, productResolver,
    orderResolver
} from "./resolvers";
const typeDefs = require('./typeDefs');


const baseTypeDefs = gql`
    scalar Date
    scalar Void
    type Query
    type Mutation
`

const context = async ({ req }) => {
    const query = req.body.query;

    // Skip token validation for specific queries and mutations
    if (
        query.includes("getAllProducts") || 
        query.includes("signUpUser") || 
        query.includes("signIn")
    ) {
        return {}; // No token validation for these queries/mutations
    }

    const authorizationHeader = req.headers.authorization || '';
    const token = authorizationHeader.split(' ')[1];

    if (!token) {
        throw new AuthenticationError("Authentication token is required.")
    }

    const user = await validateToken(token);

    return { user }; // return the valid user
}

const server = new ApolloServer({
    typeDefs: [baseTypeDefs, ...typeDefs],
    resolvers: _.merge({}, baseResolver, faqResolver, userResolver, productResolver, orderResolver),
    context,
    introspection: true,
    playground: true,
    debug: false
})

server.listen({ port: process.env.PORT || 4000, host: '127.0.0.1' }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});