const { GraphQLObjectType, GraphQLSchema } = require('graphql');
const expenditureQueries = require('./Expenditure/ExpenditureQueries'); // Import of expenditure queries
const expenditureMutations = require('./Expenditure/ExpenditureMutations'); // Import of expenditure mutations
const categoryQueries = require('./Categories/CategoriesQuery'); // Import of category queries
const categoryMutations = require('./Categories/CategoriesMutations'); // Import of category mutations
const ToDoQueries=require('./ToDo/ToDoQuery') // Import of ToDo queries
const ToDoMutations=require('./ToDo/ToDoMutations') // Import of ToDo mutations
const userMutations=require('./Users/Authentication/LoginMutation')
const CalendarQueries=require('./Calendar/CalendarQueries')
const CalendarMutation=require('./Calendar/CalendarMutations')


// Define a root query type
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        ...expenditureQueries, // Include expenditure-specific queries
        ...categoryQueries, // Include category-specific queries
        ...ToDoQueries,     // Include ToDo-specific queries
        ...CalendarQueries, //Include calendar-specific queries
    },
});

// Define a root mutation type
const RootMutation = new GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
        ...expenditureMutations, // Include expenditure-specific mutations
        ...categoryMutations, // Include category-specific mutations
        ...ToDoMutations, // Include Todo-specific mutations
        ...userMutations, //User mutations
        ...CalendarMutation //Include calendar-specific mutations
    },
});

// Create the GraphQL schema by combining the root query and mutation
const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation,
});

module.exports = schema;
