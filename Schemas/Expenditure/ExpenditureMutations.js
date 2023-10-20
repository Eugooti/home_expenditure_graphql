const { GraphQLString, GraphQLInt } = require('graphql');
const Expenditure = require('../../Models/ExpenditureModel'); // Import your Expenditure Sequelize model
const ExpenditureType = require('./ExpenditureTypes');
const {GraphQLNonNull} = require("graphql/type"); // Import the Expenditure GraphQL type

const expenditureMutations = {
    // Mutation to create a new expenditure
    createExpenditure: {
        type: ExpenditureType,
        args: {
            name: { type: new GraphQLNonNull(GraphQLString) },
            category: { type: new GraphQLNonNull(GraphQLString) },
            cost: { type: new GraphQLNonNull(GraphQLInt) },
            description: { type: new GraphQLNonNull(GraphQLString) },
            createdBy: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve(_, args) {
            return Expenditure.create(args);
        },
    },

    // Mutation to update an expenditure
    updateExpenditure: {
        type: ExpenditureType,
        args: {
            id: { type: GraphQLInt },
            name: { type: GraphQLString },
            category: { type: GraphQLString },
            cost: { type: GraphQLInt },
            description: { type: GraphQLString },
        },
        async resolve(_, args) {

            try {
                const expenditure = await Expenditure.findByPk(args.id);

                if (!expenditure) {
                    throw new Error('Expenditure not found');
                }

                // Update the fields you want to change
                expenditure.name = args.name || expenditure.name;
                expenditure.category = args.category || expenditure.category;
                expenditure.cost = args.cost || expenditure.cost;
                expenditure.description = args.description || expenditure.description;

                // Save the updated expenditure
                await expenditure.save();

                return expenditure;

            }catch (e) {
                console.log(e)
            }


        },
    },

    // Mutation to delete an expenditure
// Mutation to delete an expenditure
//     deleteExpenditure: {
//         type: ExpenditureType, // Return the deleted expenditure
//         args: {
//             id: { type: GraphQLInt },
//         },
//         async resolve(_, args) {
//             const expenditure = await Expenditure.findByPk(args.id);
//
//             if (!expenditure) {
//                 throw new Error('Expenditure not found');
//             }
//
//             try {
//                 // Delete the expenditure
//                 await expenditure.destroy();
//                 return expenditure; // Return the deleted expenditure
//             } catch (error) {
//                 console.error('Failed to delete expenditure:', error);
//                 throw new Error('Failed to delete expenditure');
//             }
//         },
//     }

    deleteExpenditure: {
        type: GraphQLString, // Return the deleted expenditure or null
        args: {
            id: { type: GraphQLInt },
        },
        async resolve(_, args) {
            try {

            const expenditure = await Expenditure.findByPk(args.id);

            if (!expenditure) {
                return 'Expenditure not found';
            }
                // Delete the expenditure
                await expenditure.destroy();
                return null; // Return null on successful deletion
            } catch (error) {
                console.error('Failed to delete expenditure:', error);
                throw new Error('Failed to delete expenditure');
            }
        },
    }

};

module.exports = expenditureMutations;
