const express = require('express');
const router = express.Router();
// const emsController = require('../controllers/emsController'); didnt use contoller yet
const emp = require('../models/Emp');

router.get('/create',(req,res) => {
    res.render('create', { title: 'Create a new Employee Profile' });
});

router.get('/',(req,res) => {
    emp.find().sort({ createdAt: -1})
        .then(result => {
            res.render('index',{emp: result, title: 'All Employee'});
        })
        .catch(err => {
            console.log(err);
        })
});

router.post('/', (req,res) => {
    const emp = new emp(req.body);
        emp.save()
            .then((result => { 
                res.redirect('/emp')
            }))
            .catch(err => {
                console.log(err);
            })
});

router.get('/:id', (req,res) => {
    const id = req.params.id;

    emp.findById(id)
        .then(result => {
            res.render('details',{emp: result, title: 'Employee Details'})
        })
        .catch((err) =>{
            console.log(err);
        })
});

router.delete('/:id', (req,res) => {
    const id = req.params.id;

    emp.findByIdAndDelete(id)
        .then(result => {
            res.json({redirect: '/blogs'})
        })
        .catch(err => {
            console.log(err);
        })
})


module.exports = router;