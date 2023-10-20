const {GraphQLObjectType, GraphQLInt, GraphQLList, GraphQLString} = require("graphql/type");

const CalendarType=new GraphQLObjectType({
    name:"CalendarType",
    fields:()=>({
        id:{type:GraphQLInt},
        title:{type:GraphQLString},
        description:{type:GraphQLString},
        start:{type:GraphQLString},
        end:{type:GraphQLString},
        CreatedBy:{type:GraphQLString},
    })
})

module.exports=CalendarType;