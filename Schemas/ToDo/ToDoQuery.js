const {GraphQLList, GraphQLInt, GraphQLString} = require("graphql/type");
const ToDo=require('../../Models/ToDoModel')
const ToDoType=require('./ToDoType')

const ToDoQuery={
    getAllToDo: {
        type:new GraphQLList(ToDoType),
        resolve(){
            return ToDo.findAll();
        }
    },
    getToDoByID:{
        type:ToDoType,
        args:{
            id:{type:GraphQLInt},
        },
        resolve(_,{id}) {
            return ToDo.findByPk(id);
        }
    },
    getByUser:{
        type:new GraphQLList(ToDoType),
        args: {
            emailAddress: {type:GraphQLString},
        },
        resolve(_,{emailAddress}){
            return ToDo.findAll({
                where:{createdBy: emailAddress}
            })
        }
    }
};

module.exports=ToDoQuery