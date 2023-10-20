const {GraphQLObjectType,GraphQLString,GraphQLInt}=require('graphql');

const ToDoType=new GraphQLObjectType({
    name:'ToDo',
    fields:()=>({
        id:{type:GraphQLInt},
        title:{type:GraphQLString},
        date:{type:GraphQLString},
        description: { type: GraphQLString },
        createdBy: { type: GraphQLString }
    }),
});

module.exports=ToDoType;