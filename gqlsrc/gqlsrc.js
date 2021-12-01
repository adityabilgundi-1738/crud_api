// const express = require('express');
// const {graphqlHTTP} = require('express-graphql');
// const {buildSchema}  = require('graphql');
// const bodyParser = require('body-parser');
// const { findByIdAndDelete } = require('../models/Emp');

// crud.use(bodyParser.json());

// crud.use('/graphql', graphqlHTTP({
//     schema: buildSchema(`
//         type Employee{
//             _id: ID!
//             Name: String!
//             EmployeeNo: Int!
//             email: String!
//             HolidaysUsed: Int!
//             Mobileno: String!
//             cityName: String!
//             Aadharno: String!
//         }
//         input CreateEmployee{
//             Name: String!
//             EmployeeNo: Int!
//             email: String!
//             HolidaysUsed: Int!
//             Mobileno: String!
//             cityName: String!
//             Aadharno: String!
//         }
//         input EditEmployee{
//             Name: String
//             EmployeeNo: Int
//             email: String
//             HolidaysUsed: Int
//             Mobileno: String
//             cityName: String
//             Aadharno: String
//         }
//         input DeleteEmployee{

//         }
//         type RootQuery{
//             emp: [Employee!]!
//         }
//         type RootMutation{
//             createEmp(createEmployee: CreateEmployee): Employee
//             editEmp(editemployee: EditEmployee): Employee
//         }
//         schema{
//             query: RootQuery
//             mutation: RootMutation
//         }
//     `),
//     rootValue:{
//         emp: () => {
//             return Emp
//                 .find()
//                 .then(emp => {
//                     return emp.map(emp => {
//                         return {...emp._doc, _id: emp.id}
//                     })
//                 })
//                 .catch(Err => {
//                     console.log(err)
//                 })
//         },
//         createEmp: (args) => {
//             const newEmp = new Emp({
//                 Name: args.createEmployee.Name,
//                 EmployeeNo: args.createEmployee.EmployeeNo,
//                 email: args.createEmployee.email,
//                 HolidaysUsed: args.createEmployee.HolidaysUsed,
//                 Mobileno: args.createEmployee.Mobileno,
//                 cityName: args.createEmployee.cityName,
//                 Aadharno: args.createEmployee.Aadharno
//             });
//             return newEmp
//                 .save()
//                 .then(result => {
//                     console.log(result);
//                     return{...result._doc}
//                 })
//                 .catch(err => {
//                     console.log(err);
//                 })
//         },
//         editEmp: (args) => {

//         },
//         deleteEmp: (args) => {
//             emp: () => {
//                 return Emp
//                 .findByIdAndDelete()
//             }
//         }
//     },
//     graphiql: true
// }))