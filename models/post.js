const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const postSchema = new Schema({
    title: {
        type:String,
        required:true,
    },
    content: {
        type:String,
        // required:true,
    },
    author:{
        type:String,
        required:true,
        ref:"user"
    }
},{timestamps:true});

const post = mongoose.model('posts',postSchema);
module.exports = post;
