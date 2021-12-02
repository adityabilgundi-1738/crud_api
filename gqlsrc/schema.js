const { 
   GraphQLObjectType,
   GraphQLNonNull, 
   GraphQLInt, 
   GraphQLString, 
   GraphQLID,
   GraphQLSchema
} = require('graphql');

const RootQueryType = require('./queries');
const RootMutationType = require('./mutations');
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

const RootQueryType = new GraphQLObjectType({
   name: 'Query',
   description: 'Root Query',
   fields: () => ({
      allEmp: {
         // name: "All Employee Details",
         type: employeeType,
         description: "List of all Employee",
         resolve: async function () {
            try{
               return await 
            }
            catch(err){
               console.log(err);
            }
         }
      },
      empbyid: {
         name: "Employee Details",
         type: new GraphQLObjectType(employeeType),
         description: "Employee Details",
         args: {
            id: {type: GraphQLID}
         },
         resolve: async function (root,params) {
            try{
               return await employeemodel.findById(params._id)
            }
            catch(err){
               console.log(err)
            }
         }
      }
   })
})

const RootMutationType = new GraphQLObjectType({
   name: 'Mutation',
   description: 'Root Mutation',
   fields: () => ({
      newEmployee: {
         type:employeeType,
         description:"Create new employee",
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
      },
      updateEmployee: {
      type: employeeType,
      description: "Create a new Employee",
      args:{
          _id:{
              name: '_id',
              type: new GraphQLObjectType(GraphQLID)
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
      
      },
      deleteEmployee: {
         type: employeeType,
         description: "Delete an Employee",
         args:{
             _id:{
                 name: '_id',
                 type: new GraphQLObjectType(GraphQLID)
             },
         },
         resolve: async function(root,params) {
             const deletedEmployee = await employeemodel.findByIdAndDelete(params._id)
             if(!deletedEmployee){
                 throw new Error('Error');
             }
             return deletedEmployee
         }
     }
   })
})

const EmpSchema = new GraphQLSchema({
   query: RootQueryType,
   mutation: RootMutationType
})

module.exports = EmpSchema