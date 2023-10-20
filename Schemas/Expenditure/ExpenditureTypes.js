const { GraphQLObjectType, GraphQLString, GraphQLInt } = require('graphql');
const CategoryType=require('../Categories/CategoriesType');
const CategoriesModal=require('../../Models/Category')

const ExpenditureType = new GraphQLObjectType({
    name: 'Expenditure',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        category: { type: GraphQLString },
        cost: { type: GraphQLInt },
        description: { type: GraphQLString },
        createdBy: { type: GraphQLString },
        updatedBy: { type: GraphQLString },
        categories:{
            type:CategoryType,
            resolve(parent,args){
                console.log(parent)
                return CategoriesModal.findOne({
                    where:{name:parent.category}
                })
            }
        }
    }),
});

module.exports = ExpenditureType;
