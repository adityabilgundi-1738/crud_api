const mongoose = require('mongoose');

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
    Mobileno:{
        type: Number,
        required: true
    },
    cityName:{
        type: String,
        required: true
    },
    Aadharno:{
        type:String,
        required: true
    }
}, { timestamps: true });

const Emp = mongoose.model('Emp',empSchema)
module.exports = Emp;