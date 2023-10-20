const Calendar=require('../../Models/CalenderModel');
const CalendarType=require('./CalendarType')
const {GraphQLList, GraphQLInt, GraphQLNonNull, GraphQLString} = require("graphql/type");

const CalendarQueries={

    //todo: get all events categories
    getAllEvents:{
        type:new GraphQLList(CalendarType),
        resolve(){
            return Calendar.findAll();
        },
    },


    //todo: get event by id
    getEventById:{
        type: CalendarType,
        args:{
            id:{type:new GraphQLNonNull(GraphQLInt)}
        },
        resolve(_,{id}) {
            return Calendar.findByPk(id);
        }
    },


    //todo: get events by user
    getEventsByUser:{
        type:new GraphQLList(CalendarType),
        args: {
            emailAddress:{type: new GraphQLNonNull(GraphQLString)}
        },
        resolve(_,{emailAddress}){
            return Calendar.findAll({
                where:{createdBy: emailAddress}
            })
        }
    }

}

module.exports=CalendarQueries;