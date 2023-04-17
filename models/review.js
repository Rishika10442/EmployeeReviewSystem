const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    description:{
        type:String,
        
    },
    reviewBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Employee'
    },
    reviewFor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Employee'
    }

})

const Review = mongoose.model('Review',reviewSchema);
module.exports=Review;