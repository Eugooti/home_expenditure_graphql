const {GraphQLObjectType, GraphQLString, GraphQLInt} = require("graphql/type");
const UserType=new GraphQLObjectType({
    name:'User',
    fields:()=>({
        id:{type:GraphQLInt},
        firstName:{type:GraphQLString},
        lastName:{type:GraphQLString},
        emailAddress:{type:GraphQLString},
        access:{type:GraphQLString},
        phoneNumber:{type:GraphQLString},
        activeState:{type:GraphQLString},
        password:{type:GraphQLString},
    })
})

module.exports=UserType