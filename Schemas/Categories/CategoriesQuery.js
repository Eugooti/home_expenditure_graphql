const { GraphQLList, GraphQLInt } = require('graphql');
const Category = require('../../Models/Category'); // Import your Category Sequelize model
const CategoryType = require('./CategoriesType');
const {GraphQLString} = require("graphql/type"); // Import the Category GraphQL type

const categoryQueries = {
    getAllCategories: {
        type: new GraphQLList(CategoryType),
        resolve() {
            return Category.findAll();
        },
    },
    getCategoryById: {
        type: CategoryType,
        args: {
            id: { type: GraphQLInt },
        },
        resolve(_, { id }) {

            return Category.findByPk(id);
        },
    },
    getCategoriesByUser:{
        type:new GraphQLList(CategoryType),
        args: {
            emailAddress:{type:GraphQLString}
        },
        resolve(_,{emailAddress}){
            return Category.findAll({
                where:{createdBy: emailAddress}
            })
        }
    }
    // Add more queries as needed, e.g., getCategoryByName, etc.
};

module.exports = categoryQueries;
