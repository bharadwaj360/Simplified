const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password:{
    type:String,
    required:true,
    unique:true, 
    trim:true
  },
  Phonenumber:{
    type:String,
    required:true,
    unique:true,
    trim:true
  }

});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;