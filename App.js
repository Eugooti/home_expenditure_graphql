const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const Expenditure = require('./Models/ExpenditureModel');
const Category = require('./Models/Category');
const User = require('./Models/UsersModel');
const ToDo = require('./Models/ToDoModel');
const Calendar = require('./Models/CalenderModel');
const schema = require('./Schemas/Schema');
const crypto = require('crypto');
const passport=require('./Configuration/Passport/PassportConfig')
const session = require('express-session');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');



const app = express();
const port = process.env.PORT || 3000; // Use an environment variable for the port

// Log requests and errors to the console
app.use(morgan('dev'));

const generateSecretKey = () => {
    return crypto.randomBytes(32).toString('hex');
};


// Database synchronization
(async () => {
    try {
        // Establish your Sequelize database connection here if not already done
        await Expenditure.sync();
        await Category.sync();
        await User.sync();
        await Calendar.sync();
        await ToDo.sync();
        console.log('Database models synchronized with the database.');
    } catch (err) {
        console.error('Error synchronizing models:', err);
        process.exit(1);
    }
})();

app.use(cookieParser());
app.use(session({
    secret: generateSecretKey(),
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true, // Enable GraphiQL for testing
}));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
