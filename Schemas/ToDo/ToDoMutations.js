const ToDoModel=require('../../Models/ToDoModel');
const ToDoType=require('./ToDoType');
const {GraphQLString, GraphQLInt, GraphQLNonNull} = require("graphql/type");

const todoMutations={
    //ToDo Create a new toDo item

    createToDo:{
        type:ToDoType,
        args:{
            title:{type: new GraphQLNonNull(GraphQLString)},
            date:{type: new GraphQLNonNull(GraphQLString)},
            description:{type: new GraphQLNonNull(GraphQLString)},
            createdBy:{type: new GraphQLNonNull(GraphQLString)},
        },
        resolve(_,args){
            return ToDoModel.create(args);
        }
    },

    //ToDo update ToDo Item

    updateToDo:{
        type: ToDoType,
        args: {
            id:{type:GraphQLInt},
            title:{type: GraphQLString},
            date:{type: GraphQLString},
            description:{type: GraphQLString},
        },

        async resolve(_,args){
            const toDo=await ToDoModel.findByPk(args.id);

            if (!toDo){
                throw new Error("Todo not found")
            }

            //update the fields
            toDo.title=args.title||toDo.title;
            toDo.date=args.date||toDo.date;
            toDo.description=args.description||toDo.description;

            //save the updated toDo item
            await toDo.save();
            return toDo;
        }
    },

    //todo delete a todo

    deleteTodoItem:{
        type:GraphQLString,
        args:{
            id: {type:GraphQLString},
        },

        async resolve(_,args){
            const toDo=await ToDoModel.findByPk(args);

            if (!toDo){
                throw new Error('Todo not found')
            }

            //delete the found todo

            await toDo.destroy()

            return "Deleted successfully";
        }
    }

}

module.exports=todoMutations;