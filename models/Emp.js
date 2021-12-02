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
        required: true
    },
    HolidaysUsed:{
        type: Number,
    },
    Mobileno:{
        type: Number,
        required: true
    },
    cityName:{
        type: String
    },
    Aadharno:{
        type:String
    }
}, { timestamps: true });

module.exports = mongoose.model('Emp',empSchema);