const models = require('../models')

const getTotalSalesPerCategory = async (root, {}) => {
    try {
        // summation of each category's total price is the total sales
        const totalSalesPerCategory = await models.Order.findAll({
            attributes: [
                [models.sequelize.col('product.category'), 'category'],
                [models.sequelize.fn('SUM', models.sequelize.col('Order.total_price')), 'total_sales']
            ],
            include: [{
                model: models.Product,
                as: 'product', // using the alias defined in the model associations
                attributes: [] 
            }],
            group: [models.sequelize.col('product.category')],
            raw: true
        });

        return totalSalesPerCategory;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
}

export default {
    Query: {
        getTotalSalesPerCategory: getTotalSalesPerCategory
    }
}