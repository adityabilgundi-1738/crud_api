const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const empSchema = new mongoose.Schema({
    Name:{
        type: String,
        required: true
    },
    EmployeeNo:{
        type: Number,
        required: true
    },
    email:{
        type: String,
        required: true,
    },
    HolidaysUsed:{
        type: Number,
        required: true
    },
}, { timestamps: true });

const Emp = mongoose.model('Emp',empSchema)
module.exports = Emp;