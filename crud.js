const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const { append } = require('vary');

const crud = express();

//connect to mongo
const dbURI = 'mongodb+srv://aditya:ohayo1@blogapp.7xb4c.mongodb.net/Crud_WEC?retryWrites=true&w=majority';

mongoose 
    .connect(dbURI)
    .then(result =>{
        crud.listen(3000),
        console.log('Connected to DB');
    })
    .catch(err => console.log(err));
crud.set('view engine', 'ejs');

//middleware


crud.get('/',(req,res) =>{
    // res.redirect('') this should redirect to the index page where all employee should be listed
});

crud.get('')