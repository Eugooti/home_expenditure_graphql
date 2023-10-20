const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLInt,
} = require('graphql');
const Expenditure = require('../../Models/ExpenditureModel'); // Import the Expenditure model

// Define GraphQL types for Expenditure model
const ExpenditureType = new GraphQLObjectType({
    name: 'Expenditure',
    fields: () => ({
        id: { type: GraphQLInt }, // Unique identifier for the expenditure
        name: { type: GraphQLString }, // Name of the expenditure
        category: { type: GraphQLString }, // Category of the expenditure
        cost: { type: GraphQLInt }, // Cost of the expenditure
        description: { type: GraphQLString }, // Description of the expenditure
        createdBy: { type: GraphQLString }, // User who created the expenditure
        updatedBy: { type: GraphQLString }, // User who last updated the expenditure
    }),
});

// Define Query type for fetching expenditures
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        expenditures: {
            type: new GraphQLList(ExpenditureType),
            resolve() {
                // Resolver function to fetch all expenditures from the database
                return Expenditure.findAll();
            },
        },
    },
});

// Define Mutation type for creating, updating, and deleting expenditures
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createExpenditure: {
            type: ExpenditureType,
            args: {
                name: { type: GraphQLString },
                category: { type: GraphQLString },
                cost: { type: GraphQLInt },
                description: { type: GraphQLString },
                createdBy: { type: GraphQLString },
                updatedBy: { type: GraphQLString },
            },
            resolve(parent, args) {
                // Resolver function to create a new expenditure
                return Expenditure.create(args);
            },
        },
        updateExpenditure: {
            type: ExpenditureType,
            args: {
                id: { type: GraphQLInt }, // ID of the expenditure to update
                name: { type: GraphQLString },
                category: { type: GraphQLString },
                cost: { type: GraphQLInt },
                description: { type: GraphQLString },
                updatedBy: { type: GraphQLString },
            },
            async resolve(parent, args) {
                try {
                    // Find the expenditure by its ID
                    const expenditure = await Expenditure.findByPk(args.id);

                    if (!expenditure) {
                        throw new Error('Expenditure not found');
                    }

                    // Update the fields of the expenditure
                    expenditure.name = args.name || expenditure.name;
                    expenditure.category = args.category || expenditure.category;
                    expenditure.cost = args.cost || expenditure.cost;
                    expenditure.description = args.description || expenditure.description;
                    expenditure.updatedBy = args.updatedBy || expenditure.updatedBy;

                    // Save the updated expenditure
                    await expenditure.save();

                    return expenditure;
                } catch (error) {
                    throw new Error(error.message);
                }
            },
        },
        deleteExpenditure: {
            type: GraphQLString,
            args: {
                id: { type: GraphQLInt }, // ID of the expenditure to delete
            },
            async resolve(parent, args) {
                try {
                    // Find the expenditure by its ID
                    const expenditure = await Expenditure.findByPk(args.id);

                    if (!expenditure) {
                        throw new Error('Expenditure not found');
                    }

                    // Delete the expenditure
                    await expenditure.destroy();

                    return 'Expenditure deleted successfully';
                } catch (error) {
                    throw new Error(error.message);
                }
            },
        },
    },
});

// Create the schema by combining the Query and Mutation types
const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});

module.exports = schema;
