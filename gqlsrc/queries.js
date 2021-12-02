const { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLID 
} = require('graphql');

const employeemodel = require('../models/Emp');

const employeeType = new GraphQLObjectType({
    name: 'Employee Type',
    description: "This Represents an employee",
    fields: () => ({
        _id: {type: new GraphQLNonNull(GraphQLID)},
        name: {type: new GraphQLNonNull(GraphQLString)},
        email: {type: GraphQLNonNull(GraphQLString)},
        EmployeeNo: {type: GraphQLInt},
        HolidaysUsed: {type: GraphQLInt},
        Mobileno: {type: GraphQLString},
        cityName: {type:GraphQLString},
        Aadharno: {type:GraphQLString}
    })
})

const allEmp = new GraphQLObjectType({
    name: 'Array of all Employee',
    description: "Array of all employee",
    fields: () => ({
        employee: {
            name: "Employee Details",
            type: new GraphQLObjectType(employeeType),
            description: "List of all Employee",
            resolve: async function () {
                return await employeemodel.find({}, (err,auth) => {
                    
                });
            }
        }
    })
})

const EmployeebyId = new GraphQLObjectType({
    name: 'Employee by ID',
    description: "Employee by ID",
    fields: () => ({
        employee: {
            name: "Employee Details",
            type: new GraphQLObjectType(employeeType),
            description: "Employee Details",
            resolve: async function (root,params) {
                return await employeemodel.findById(params._id, err)
            }
        }
    })
})

module.exports = {
    EmployeebyId,
    allEmp
}