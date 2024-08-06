const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: {
        type:String,
        required:true,
        unique:true
    },  
    password: {
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:'user'
    }
},{timestamps:true});

const user = mongoose.model('user',userSchema);
module.exports = user;
