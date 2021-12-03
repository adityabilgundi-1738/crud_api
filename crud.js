const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const expressGraphQL = require('express-graphql').graphqlHTTP
const bodyParser = require('body-parser')
const empRoutes = require('./routes/empRoutes')
const methodOverride = require('method-override')
const {buildSchema}  = require('graphql')
const Emp = require('./models/Emp')


const crud = express()
crud.use(methodOverride('_method'))
crud.set('view engine', 'ejs')
crud.use(express.urlencoded({extended: true}))
crud.use(morgan('dev'))
crud.use(bodyParser.json())


mongoose 
    .connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@blogapp.7xb4c.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
    .then(result =>{
        crud.listen(3000),
        console.log('Connected to DB')
    })
    .catch(err => console.log(err)) 


var schema = buildSchema(`
input EmployeeInput{
    Name: String!
    EmployeeNo: Int!
    email: String!
    HolidaysUsed: Int!
    Mobileno: String!
    cityName: String!
    Aadharno: String!
}

type Employee{
    _id: ID!
    Name: String!
    EmployeeNo: Int!
    email: String!
    HolidaysUsed: Int!
    Mobileno: String!
    cityName: String!
    Aadharno: String!
}

input EmployeeInput2{
    Name: String,
    EmployeeNo: Int,
    email: String,
    HolidaysUsed: Int,
    Mobileno: String,
    cityName: String,
    Aadharno: String
}

input id{
    _id: ID!
}

type RootQuery{
    emp: [Employee!]!
    oneEmp(_id: ID!): Employee
}

type RootMutation{
    createEmp(createEmployee: EmployeeInput): Employee
    deleteEmp(_id: ID!): Employee
    editEmp(_id: id, editEmployee:EmployeeInput2!): Employee
}

schema{
    query: RootQuery
    mutation: RootMutation
}
`)
var rootValue = {
    emp: () => {
        return Emp
            .find()
            .then(emp => {
                return emp.map(emp => {
                    return {...emp._doc, _id: emp.id}
                })
            })
            .catch(err => {
                console.log(err)
            })
    },
    oneEmp: (args) => {
        return Emp
            .findOne({_id: args._id})
            .then(result => {
                return {...result._doc}
            })
            .catch(err => {
                console.log(err)
            })
    },
    createEmp: (args) => {
        const newEmp = new Emp({
            Name: args.createEmployee.Name,
            EmployeeNo: args.createEmployee.EmployeeNo,
            email: args.createEmployee.email,
            HolidaysUsed: args.createEmployee.HolidaysUsed,
            Mobileno: args.createEmployee.Mobileno,
            cityName: args.createEmployee.cityName,
            Aadharno: args.createEmployee.Aadharno
        });
        return newEmp
            .save()
            .then(result => {
                console.log(result);
                return{...result._doc}
            })
            .catch(err => {
                console.log(err);
            })
    },
    deleteEmp: (args) => {//works
        return Emp
            .findByIdAndRemove({_id: args._id})
            .then(result => {
                console.log(result)
                return {...result._doc}
            })
            .catch(err => {
                console.log(err);
            })
    },
    editEmp: (parent,args,context,info) => {
        Emp = new Emp()

        return Emp
        .findByIdAndUpdate({_id: args._id}, {$set: { 
            Name: args.editEmployee.Name, 
            EmployeeNo: args.editEmployee.EmployeeNo, 
            email: args.editEmployee.email, 
            HolidaysUsed:args.editEmployee.HolidaysUsed, 
            Mobileno:args.editEmployee.Mobileno, 
            cityName: args.editEmployee.cityName, 
            Aadharno:args.editEmployee.Aadharno
        }}).then(result => {
            console.log(result)
            return{...result._doc}
        }).catch(err => {
            console.log(err);
        })
    }
}
        

// const EmpSchema = require('./gqlsrc/schema')
crud.use('/graphql', expressGraphQL({
    schema: schema,
    rootValue: rootValue,
    graphiql: true
}))

//without GraphQL
crud.get('/', (req,res) => {
    res.render('welcome',{ title: 'Employee Management System'})
})

crud.get('/about',(req,res) => {
    res.render('about',{title: 'About Page'})
})

crud.use('/emp',empRoutes);

crud.use((req,res) => {
    res.status(404).render('404',{title: '404err'})
})
