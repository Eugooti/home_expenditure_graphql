const { GraphQLString, GraphQLInt } = require('graphql');
const Category = require('../../Models/Category'); // Import your Category Sequelize model
const CategoryType = require('./CategoriesType');
const {GraphQLNonNull} = require("graphql/type"); // Import the Category GraphQL type

const categoryMutations = {
    createCategory: {
        type: CategoryType,
        args: {
            name: { type: new GraphQLNonNull(GraphQLString)  },
            description: { type: new GraphQLNonNull(GraphQLString) },
            maximumCash: { type: new GraphQLNonNull(GraphQLInt) },
            createdBy: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve(_, args) {
            return Category.create(args);
        },
    },
    updateCategory: {
        type: CategoryType,
        args: {
            id: { type: new GraphQLNonNull(GraphQLInt) },
            name: { type: GraphQLString },
            description: { type: GraphQLString },
            maximumCash: { type: GraphQLInt },
        },
        async resolve(_, args) {

            try {
                const category = await Category.findByPk(args.id);

                if (!category) {
                    throw new Error('Category not found');
                }

                // Update the fields you want to change
                category.name = args.name || category.name;
                category.description = args.description || category.description;
                category.maximumCash = args.maximumCash || category.maximumCash;

                // Save the updated category
                await category.save();

                return category;
            }catch (e) {
                return e;
                console.log(e)
            }


        },
    },
    deleteCategory: {
        type: GraphQLString,
        args: {
            id: { type: GraphQLInt },
        },
        async resolve(_, {id}) {

            try {
                const category = await Category.findByPk(id);

                if (!category) {
                    throw new Error('Category not found');
                }

                // Delete the category
                await category.destroy();

                return 'Category deleted successfully';
            }catch (e) {
                return e;
            }


        },
    },
};

module.exports = categoryMutations;
