const { GraphQLList, GraphQLInt } = require('graphql');
const Expenditure = require('../../Models/ExpenditureModel'); // Import your Expenditure Sequelize model
const ExpenditureType = require('./ExpenditureTypes');
const {GraphQLString} = require("graphql/type");

const expenditureQueries = {
    // Query to get all expenditures
    getAllExpenditures: {
        type: new GraphQLList(ExpenditureType),
        resolve() {
            return Expenditure.findAll();
        },
    },

    // Query to get an expenditure by ID
    getExpenditureById: {
        type: ExpenditureType,
        args: {
            id: { type: GraphQLInt },
        },
        resolve(_, { id }) {
            return Expenditure.findByPk(id);
        },
    },
    getExpenditureByUser:{
        type:new GraphQLList(ExpenditureType),
        args: {
            emailAddress:{type:GraphQLString}
        },
        resolve(_,{emailAddress}){
            return Expenditure.findAll({
                where:{createdBy: emailAddress}
            })
        }
    }
};

module.exports = expenditureQueries;
