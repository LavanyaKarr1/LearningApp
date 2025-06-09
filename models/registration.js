const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
    username:{
        type : String,
        required : [true,'username is required'],
    },
    uid:{
        type : Number,
        required : [true,'uid is required'],
        maxLength : [12,'uid cannot be more than 12 digits'],
        unique:true
    },
    mobile:{
        type : Number,
        required : [true,'mobile is required'],
        maxLength : [10,'mobile cannot be more than 10 digits'],
        unique:true
    },
    dob:{
        type : Date,
        required : [true,'dob is required'],
    },
    email:{
        type : String,
        required : [true,'email is required'],
        unique:true
    },
    password :{
        type :String,
        required : [true,'password is required']
    }
},{timestamps:true});

module.exports = mongoose.model('Register',registerSchema);