const {Schema} = require("mongoose");
const mongoose = require("mongoose");

const postSchema = new Schema({
    content:{
        type: String,
         required: true},

    tags:{
        type: String,
        required: true
    },

    image:{
        type: String,
        
    }
});

// create context model 

const postModel = mongoose.model("posts", postSchema);

module.exports = postModel;