const { GraphQLObjectType,GraphQLSchema } = require('graphql');
const RootMutation = require('./mutations')
const RootQuery = require('./queries')

const EmpSchema = new GraphQLSchema({
   query: RootQuery,
   mutation: new GraphQLObjectType({
       name: 'Mutation',
       fields: RootMutation
   })
});

module.exports = EmpSchema;


