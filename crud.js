const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const empRoutes = require('./routes/empRoutes');
const methodOverride = require('method-override')

const crud = express();

mongoose 
    .connect('mongodb+srv://aditya:ohayo1@blogapp.7xb4c.mongodb.net/Crud_WEC?retryWrites=true&w=majority')
    .then(result =>{
        crud.listen(3000),
        console.log('Connected to DB')
    })
    .catch(err => console.log(err))


crud.set('view engine', 'ejs')
crud.use(express.urlencoded({extended: true}));
crud.use(morgan('dev'));
crud.use(methodOverride('_method'));

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