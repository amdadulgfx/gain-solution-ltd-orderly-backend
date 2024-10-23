const models = require('../models')
const bcrypt = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')
import { UserInputError } from "apollo-server";

const signUpUser = async (root, { username, email, password }) => {
    try {
        const user = await models.User.create({
            username,
            email,
            password: await bcrypt.hash(password, 10),
        })
        const token = jsonwebtoken.sign(
            { id: user.id, email: user.email, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        )
        return {
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        }
    } catch (error) {
        throw new Error(error.message)
    }
}

const signIn = async (_, { email, password }) => {
    try {
        const user = await models.User.findOne({
            where: { email }
        })

        if (!user) throw new UserInputError("No user with that email");

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) throw new UserInputError("Incorrect password");


        // return jwt
        const token = jsonwebtoken.sign(
            { id: user.id, email: user.email, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        )

        return {
            token, user
        }
    } catch (error) {
        if (error.name === "UserInputError")
            throw new UserInputError(error.message)
        console.log(error)
        throw new Error(error.message)
    }
}


export default {
    Query: {},
    Mutation: {
        signUpUser: signUpUser,
        signIn: signIn
    }
}