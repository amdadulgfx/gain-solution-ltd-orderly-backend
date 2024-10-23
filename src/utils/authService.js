const jwt = require('jsonwebtoken');
const models = require('../models');
import { AuthenticationError, UserInputError } from "apollo-server";


module.exports = {
    validateToken: async (token) => {

        try {
            const { id, email } = jwt.verify(token, process.env.JWT_SECRET);
            const user = await models.User.findByPk(id);

            if (!user.email) {
                throw new AuthenticationError("No user found with the provided credentials.")
            }
            return user;
        } catch (error) {
            console.log(error)
            throw new AuthenticationError('Authentication token is invalid.');
        }
    }
}