const Emp = require('../models/Emp.js');

const emp_index = async(req,res) => {
    result = await Emp.find().sort({createdAt: -1})
    try{
        res.render('index',{Emp: result, title: 'All Employee'});
    }
    catch(err){
        console.log(err);
    }
}

const emp_create_page = async (req,res) => {
    await res.render('create', { title: 'Create a new Employee Profile' });
}

const emp_create_post = async (req,res) => {
    const employee = new Emp(req.body);
    await employee.save();
    try{
        res.redirect('/emp');
    }
    catch(err){
        console.log(err);
    }
}

const emp_get_details = async (req,res) => {
    result = await Emp.findById(req.params.id)
    try{
    res.render('details', {Emp: result, title: 'Employee Details'})
    }
    catch(e){
        console.log(e)
    }
}

const emp_delete = async (req,res) => {
    await Emp.findByIdAndRemove(req.params.id)
    try{
        res.redirect('/emp');
    }
    catch(err){
        console.log(err)
    }
}

const emp_update_post = async (req,res) => {
    await Emp.findByIdAndUpdate(req.params.id,/*{$set: {},},*/req.body,{
        new: true
    })
        //await Emp.findByIdAndUpdate(filters for search, Content to be uploaded)
    try{
        res.redirect('/emp');
    }
    catch(err){
        console.log(err);
    }
}

const emp_get_update_form = async ( req,res) => {
    result = await Emp.findById(req.params.id)
    try{
        res.render('edit', {Emp: result, title: 'Employee Details'})
    }
    catch(e){
        console.log(e)
    }
}

module.exports = {
    emp_index,
    emp_create_post,
    emp_create_page,
    emp_get_details,
    emp_delete,
    emp_update_post,
    emp_get_update_form
}