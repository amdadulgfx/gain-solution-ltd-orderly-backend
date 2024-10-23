require('dotenv').config()
import models from "../models";
import { Op } from "sequelize";
// import nodemailer from "nodemailer";
import _ from "lodash";

export const paginate = (query, { page, perPage }, { sortField, sortOrder }) => {
    const offset = ((page - 1) * perPage);
    const limit = perPage;

    return {
        ...query,
        offset,
        limit,
        order: [
            [sortField, sortOrder],
        ],

    };
};

export const paginateResults = (items, totalCount) => {
    return {
        items,
        totalCount,
    };
};
