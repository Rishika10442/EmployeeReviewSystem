const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    name:{
        type:String,
        requires:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean
    },
    //reviews done about me
    myReviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Review'
    }],
    //the reviews i have given
    reviewByMe:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Review'
    }],
    //reviews that are pending on me
    assignedToMe:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Assigned'
    }],
    //if user is admin he can tell others to give a review
    assignedByMe:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Assigned'
    }]
    
},{
    timestamps:true
});

const Employee = mongoose.model('Employee',employeeSchema);
module.exports=Employee;