const Calendar=require('../../Models/CalenderModel')
const {GraphQLString, GraphQLNonNull, GraphQLInt} = require("graphql/type");

const CalendarMutations={

    //todo: Create new model

    createEvent:{
        type:GraphQLString,
        args:{
            title:{type: new GraphQLNonNull(GraphQLString)},
            description:{type: new GraphQLNonNull(GraphQLString)},
            start:{type: new GraphQLNonNull(GraphQLString)},
            end:{type: new GraphQLNonNull(GraphQLString)},
            CreatedBy:{type: new GraphQLNonNull(GraphQLString)},
        },

       async resolve(_,args){

            try {
                const calendar=await Calendar.create(args);

                if (!calendar){
                    return "Unable to add event"
                }
                return "Event added successfully"

            }catch (error) {
                return error
            }

        }

    },

    //todo: update event

    updateEvent:{
        type:GraphQLString,
        args:{
            id:{type:new GraphQLNonNull(GraphQLInt)},
            title:{type: GraphQLString},
            description:{type: GraphQLString},
            start:{type: GraphQLString},
            end:{ type: GraphQLString},
            CreatedBy:{type: GraphQLString},
        },

        async resolve(_,args){
            try {
                const calendar=await Calendar.findByPk(args.id);

                if (!calendar){
                    throw new Error('Event not found');
                }

                calendar.title=args.title||calendar.title;
                calendar.description=args.description||calendar.description;
                calendar.start=args.start||calendar.start;
                calendar.end=args.end||calendar.end;

                await calendar.save()

                return "Event updated successfully"
            }catch (error) {
                return error
            }

        }
    },


    //todo: delete event

    deleteEvent:{
        type:GraphQLString,
        args:{
            id:{type:new GraphQLNonNull(GraphQLInt)}
        },
        async resolve(_,{id}){
            try {
                const calendar=await Calendar.findByPk(id);

                if (!calendar){
                    throw new Error('Event not found');
                }

                await calendar.destroy();

                return "Event deleted seuccessfully"
            }catch (error) {
                return error
            }
        }
    }
}

module.exports=CalendarMutations;