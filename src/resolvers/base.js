import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

export default {
    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',
        parseValue(value) {
            return new Date(value); // value from the client
        },
        serialize(value) {
            // return value.getTime(); // value sent to the client
            return value.toISOString(); // value sent to the client
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.INT) {
                return parseInt(ast.value, 10); // ast value is always in string format
            }
            return null;
        },
    }),
    Void: new GraphQLScalarType({
        name: 'Void',

        description: 'Represents NULL values',

        serialize() {
            return null
        },

        parseValue() {
            return null
        },

        parseLiteral() {
            return null
        }
    })
}