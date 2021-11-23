const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const empRoutes = require('./routes/empRoutes');

//express crud
const crud = express();

//connect to mongo
const dbURI = 'mongodb+srv://aditya:ohayo1@blogapp.7xb4c.mongodb.net/Crud_WEC?retryWrites=true&w=majority'

mongoose 
    .connect(dbURI)
    .then(result =>{
        crud.listen(3000),
        console.log('Connected to DB')
    })
    .catch(err => console.log(err))

//set engines
crud.set('view engine', 'ejs')

//middleware
crud.use(express.urlencoded({extended: true}));
crud.use(morgan('dev'));

//redirect to routes
crud.get('/', (req,res) => {
    res.render('welcome',{ title: 'Emloyee Management System'})
})

crud.get('/',(req,res) => {
    res.redirect('/emp')
})

//routing
crud.use('/emp',empRoutes);

//404 error
crud.use((req,res) => {//should be in the end, bcs this fires for all '/blah'
    res.status(404).render('404',{title: '404err'})
})