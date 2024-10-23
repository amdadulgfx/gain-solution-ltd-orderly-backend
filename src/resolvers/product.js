const models = require('../models')
import { UserInputError } from "apollo-server";
import { paginate, paginateResults } from "../utils/common";

const getAllProducts = async (root, { page = 1, perPage = 10 }) => {
    try {
        const products = await models.Product.findAndCountAll(
            paginate({}, { page, perPage }, {
                sortField: "id",
                sortOrder: "ASC",
            })
        );

        return paginateResults(products.rows, products.count);
    } catch (error) {
        console.log(error);
        throw new Error(error.message)
    }
}

const addProduct = async (root, { name, category, price }, { }) => {
    try {
        const addedProduct = await models.sequelize.transaction(
            async (t) => {
                const product = await models.Product.create({
                    name,
                    category,
                    price
                }, { transaction: t })

                return product;
            }
        )

        return addedProduct;
    } catch (error) {
        console.log(error);
        throw new Error(error.message)
    }
}

const updateProduct = async (root, { id, name, category, price }, { }) => {
    try {

        const productFound = await models.Product.findByPk(id);
        if (!productFound) {
            throw new UserInputError(`Record not found for the id: ${id}`);
        }

        const updatedProduct = await models.sequelize.transaction(
            async (t) => {
                const product = await models.Product.update(
                    {
                        name,
                        category,
                        price
                    },
                    {
                        transaction: t,
                        where: { id: id },
                        returning: true,
                        plain: true
                    })

                return product[1];
            }
        )
        return updatedProduct;
    } catch (error) {
        console.log(error);
        throw new Error(error.message)
    }
}

const deleteProduct = async (root, { id, name, category, price }, { }) => {
    try {

        const productFound = await models.Product.findByPk(id);
        if (!productFound) {
            throw new UserInputError(`Record not found for the id: ${id}`);
        }

        const deletedProductRes = await models.sequelize.transaction(
            async (t) => {

                await models.Order.destroy({
                    where: { product_id: id },
                    transaction: t
                  });

                await models.Product.destroy(
                    {
                        where: { id: id },
                        transaction: t
                    })

                return `Product id: ${id} deleted successfully`;
            }
        )
        return deletedProductRes;
    } catch (error) {
        console.log(error);
        throw new Error(error.message)
    }
}

export default {
    Query: {
        getAllProducts: getAllProducts
    },
    Mutation: {
        addProduct: addProduct,
        updateProduct: updateProduct,
        deleteProduct: deleteProduct
    }
}