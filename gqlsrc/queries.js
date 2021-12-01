const { GraphQLObjectType } = require('graphql');
const employeemodel = require('../models/Emp')

const employeeType = new GraphQLObjectType({
    name: 'Employee Type',
    description: "This Represents an employee",
    fields: () => ({
        _id: {type: new GraphQLNonNull(GraphQLString)},
        name: {type: new GraphQLNonNull(GraphQLString)},
        email: {type: GraphQLNonNull(GraphQLString)},
        EmployeeNo: {type: GraphQLInt},
        HolidaysUsed: {type: GraphQLInt},
        Mobileno: {type: GraphQLString},
        cityName: {type:GraphQLString},
        Aadharno: {type:GraphQLString}
    })
})

const Emp = new GraphQLObjectType({
    name: 'Employee Type',
    description: "This is an Employee",
    fields: () => ({
        employee: {
            type: new GraphQLObjectType(employeeType),
            description: "List of all Employee",
            resolve: async function () {
                return await employeemodel.find({}, (err,auth) => {
                });
            }
        }
    })
})

module.exports = Emp
