const { GraphQLObjectType, GraphQLNonNull,GraphQLInt } = require('graphql');
const employeemodel = require('../models/Emp');
const Emp = require('./queries');

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

const createEmp = new GraphQLObjectType({
    type: employeeType,
    args:{
        name:{
            name:'name',
            type: new GraphQLNonNull(GraphQLString),
        },
        email: {
            name:'email',
            type: GraphQLNonNull(GraphQLString)
        },
        EmployeeNo: {
            name: 'EmployeeNo',
            type: GraphQLInt
        },
        HolidaysUsed: {
            name: 'HolidaysUsed',
            type: GraphQLInt
        },
        Mobileno: {
            name: 'Mobileno',
            type: GraphQLString
        },
        cityName: {
            name: 'cityName',
            type:GraphQLString
        },
        Aadharno: {
            name:'Aadharno',
            type:GraphQLString
        }
    },
    resolve: async function (root,params) {
        const model = new employeemodel(params);
        const newEmp = await model.save();
        if(!newEmp){
            throw new Error('Error')
        }
        return newEmp
    }
})

const updateEmp = new GraphQLObjectType({
    type: employeeType,
    args:{
        _id:{
            name: '_id',
            type: new GraphQLObjectType(GraphQLString)
        },
        name:{
            name:'name',
            type: new GraphQLNonNull(GraphQLString),
        },
        email: {
            name:'email',
            type: GraphQLNonNull(GraphQLString)
        },
        EmployeeNo: {
            name: 'EmployeeNo',
            type: GraphQLInt
        },
        HolidaysUsed: {
            name: 'HolidaysUsed',
            type: GraphQLInt
        },
        Mobileno: {
            name: 'Mobileno',
            type: GraphQLString
        },
        cityName: {
            name: 'cityName',
            type:GraphQLString
        },
        Aadharno: {
            name:'Aadharno',
            type:GraphQLString
        }
    },
    resolve: async function(root,params){
        let updateEmp = {};

        if(params.name){ updateEmp.name = params.name }
        if(params.email){ updateEmp.email = params.email }
        if(params.EmployeeNo){ updateEmp.EmployeeNo = params.EmployeeNo }
        if(params.HolidaysUsed){ updateEmp.HolidaysUsed = params.HolidaysUsed }
        if(params.Mobileno){ updateEmp.Mobileno = params.Mobileno }
        if(params.cityName){ updateEmp.cityName = params.cityName }
        if(params.Aadharno){ updateEmp.Aadharno = params.Aadharno }

        const Employee = await employeemodel.findByIdAndUpdate(param._id,updateEmp, {new: true})
        console.log(Employee)
        if(!Employee){
            throw new Error('Error')
        }
        return Employee
    }
})

const deleteEmp = new GraphQLObjectType({
    type: employeeType,
    args:{
        _id:{
            name: '_id',
            type: new GraphQLObjectType(GraphQLString)
        },
    },
    resolve: async function(root,params) {
        const deletedEmployee = await employeemodel.findByIdAndDelete(params._id)
        if(!deletedEmployee){
            throw new Error('Error');
        }
        return deletedEmployee
    }
})

module.exports = {
    createEmp,
    updateEmp,
    deleteEmp
}