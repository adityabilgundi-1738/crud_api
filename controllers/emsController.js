const emp = require('../models/Emp.js');

const emp_index = (req,res) => {
    emp.find().sort({ createdAt: -1})
        .then(result => {
            res.render('index',{emp: result, title: 'All Employee'});
        })
        .catch(err => {
            console.log(err);
        })
}

const emp_create_get = (req,res) => {
    res.render('create', { title: 'Create a new Employee Profile' });
}

const emp_create_post = (req,res) => {
    const employee = new emp(req.body);
        employee.save()
            .then((result => { 
                res.redirect('/emp')
            }))
            .catch(err => {
                console.log(err);
            })
}

const emp_get_details = (req,res) => {
    const id = req.params.id;

    emp.findById(id)
        .then(result => {
            res.render('details',{emp: result, title: 'Employee Details'})
        })
        .catch((err) =>{
            console.log(err);
        })
}

const emp_delete = (req,res) => {
    const id = req.params.id;

    emp.findByIdAndDelete(id)
        .then(result => {
            res.json({redirect: '/blogs'})
        })
        .catch(err => {
            console.log(err);
        })
}

module.exports = {
    emp_index,
    emp_create_post,
    emp_create_get,
    emp_get_details,
    emp_delete,
}