const mongoose = require("mongoose");

const assignedSchema = new mongoose.Schema({
    assignedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Employee'
    },
    assignedFor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Employee'
    },
    assignedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Employee'
    }
},{
    timestamps:true
}) 

const Assigned = mongoose.model('Assigned',assignedSchema);
module.exports=Assigned;