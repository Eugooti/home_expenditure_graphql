const { GraphQLString, GraphQLNonNull } = require("graphql/type");
const UserModel = require('../../../Models/UsersModel');
const { hash, compare } = require("bcrypt");
const passport = require('../../../Configuration/Passport/PassportConfig');
const UserType=require('../UserType')
const UserMutations = {
    // Create User Mutation
    createUser: {
        type: GraphQLString,
        args: {
            firstName: { type: new GraphQLNonNull(GraphQLString) },
            lastName: { type: new GraphQLNonNull(GraphQLString) },
            emailAddress: { type: new GraphQLNonNull(GraphQLString) },
            phoneNumber: { type: new GraphQLNonNull(GraphQLString) },
            access: { type: new GraphQLNonNull(GraphQLString) },
        },
        async resolve(parent, args) {
            // Hash the email address to create the password
            const hashedPassword = await hash(args.emailAddress, 10);

            try {
                const newUser = await UserModel.create({
                    firstName: args.firstName,
                    lastName: args.lastName,
                    emailAddress: args.emailAddress,
                    phoneNumber: args.phoneNumber,
                    access: args.access,
                    password: hashedPassword, // Use the hashed password
                });

                return "User Created Successfully";
            } catch (error) {
                if (error.name === 'SequelizeUniqueConstraintError') {
                    return 'User already exists with this email address';
                }

                console.error('Error:', error);
                return error;
            }
        },
    },

    // Login User Mutation
    login: {
        type: UserType,
        args: {
            emailAddress: { type: GraphQLString },
            password: { type: GraphQLString },
        },
        resolve: async (parent, args, { req }) => {
            return new Promise((resolve, reject) => {
                passport.authenticate('local', (err, user, info) => {
                    if (err) {
                        reject(err);
                    }
                    if (!user) {
                        reject(info.message);
                    }

                    req.logIn(user, (err) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(user);
                    });
                })(req);
            });
        },
    },};

module.exports = UserMutations;
