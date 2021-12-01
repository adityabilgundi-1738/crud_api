const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const methodOverride = require('method-override');
const {graphqlHTTP} = require('express-graphql');
const {buildSchema}  = require('graphql');
const bodyParser = require('body-parser');

const crud = express();

//routing 
const empRoutes = require('./routes/empRoutes');
// const empRoutesgql = require('./gqlsrc/gqlRoutes');

//middleware
crud.set('view engine', 'ejs');
crud.use(express.urlencoded({extended: true}));
crud.use(morgan('dev'));
crud.use(methodOverride('_method'));

//including models for gql
const Emp = require('./models/Emp');

crud.use(bodyParser.json());

// var schema = buildSchema(`
// type Employee{
//     _id: ID!
//     Name: String!
//     EmployeeNo: Int!
//     email: String!
//     HolidaysUsed: Int!
//     Mobileno: String!
//     cityName: String!
//     Aadharno: String!
// }

// type {
//     Name: String!
//     EmployeeNo: Int!
//     email: String!
//     HolidaysUsed: Int!
//     Mobileno: String!
//     cityName: String!
//     Aadharno: String!
// }

// input CreateEmployee{
//     Name: String!
//     EmployeeNo: Int!
//     email: String!
//     HolidaysUsed: Int!
//     Mobileno: String!
//     cityName: String!
//     Aadharno: String!
// }
// input DeleteEmployee{
//     _id: ID
// }
// type RootQuery{
//     emp: [Employee!]!
//     oneemp: Employee
// }
// type RootMutation{
//     createEmp(createEmployee: CreateEmployee): Employee
//     deleteEmp(deleteEmployee: DeleteEmployee): Employee
// }
// schema{
//     query: RootQuery
//     mutation: RootMutation
// }
// `)
// var rootValue = {
//     // oneemp: (args) => {
//     //     return Emp
//     //         .findById(args._id)
//     //         .then(emp => {
//     //             return emp.map(emp => {
//     //                 return {...emp._doc, _id: emp.id}
//     //             })
//     //         })
//     //         .catch(err => {
//     //             console.log(err)
//     //         })
//     // },
//     emp: () => {
//         return Emp
//             .find()
//             .then(emp => {
//                 return emp.map(emp => {
//                     return {...emp._doc, _id: emp.id}
//                 })
//             })
//             .catch(err => {
//                 console.log(err)
//             })
//     },
//     createEmp: (args) => {
//         const newEmp = new Emp({
//             Name: args.createEmployee.Name,
//             EmployeeNo: args.createEmployee.EmployeeNo,
//             email: args.createEmployee.email,
//             HolidaysUsed: args.createEmployee.HolidaysUsed,
//             Mobileno: args.createEmployee.Mobileno,
//             cityName: args.createEmployee.cityName,
//             Aadharno: args.createEmployee.Aadharno
//         });
//         return newEmp
//             .save()
//             .then(result => {
//                 console.log(result);
//                 return{...result._doc}
//             })
//             .catch(err => {
//                 console.log(err);
//             })
//     },
//     deleteEmployee: (args) => {
//         return Emp
//             .findByIdAndDelete(args._id)
//             .then(emp => {
//                 return {...emp._doc, _id: emp.id}
//             })
//             .catch(err => {
//                 console.log(err);
//             })
//         }
// }

crud.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: rootValue,
    graphiql: true
}))

crud.get('/', (req,res) => {
    res.render('welcome',{ title: 'Employee Management System'})
})

crud.get('/about',(req,res) => {
    res.render('about',{title: 'About Page'})
})

crud.use('/emp',empRoutes);//without Gql

crud.use((req,res) => {
    res.status(404).render('404',{title: '404err'})
})

mongoose 
    .connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@blogapp.7xb4c.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
    .then(result =>{
        crud.listen(3000),
        console.log('Connected to DB')
    })
    .catch(err => console.log(err))
