const { GraphQLObjectType, GraphQLString, GraphQLInt } = require('graphql');

const CategoryType = new GraphQLObjectType({
    name: 'Category',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        maximumCash: { type: GraphQLInt },
        createdBy: { type: GraphQLString },
        updatedBy: { type: GraphQLString },
    }),
});

module.exports = CategoryType;
