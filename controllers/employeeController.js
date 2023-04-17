const Employee = require("../models/employee");
const Review =require("../models/review");
const Assigned = require("../models/assigned");

module.exports.createEmployee =async function(req,res){
   try{
    console.log(req.body);
    await Employee.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        isAdmin:false
    })
    console.log("new employee created");
    if(req.user){
       return res.redirect('/employee/home')
    }
    return res.redirect('/sign-in')
    }catch(err){
        console.log(err);
        res.redirect('/sign-up')
    }
}

module.exports.home = async function(req,res){
    // console.log(req.user);
    try{
        if(req.user.isAdmin==true){
            
            const Totalreviews = await Review.find({}).populate('reviewBy').populate('reviewFor');
            const Totalemployees = await Employee.find({});

            return res.render('adminView',{
                totalreviews:Totalreviews,
                totalemployees:Totalemployees
            });
        }
    }catch(err){
        console.log("error at trying to render admin view")
        console.log(err);
    }   

    try{
        const userId = req.user._id;

        const user = await Employee.findById(userId)
        .populate({
            path: 'assignedToMe',
            populate: [{ path: 'assignedBy', select: 'name email' }, // populate the 'assignedBy' field with 'name' and 'email'
            { path: 'assignedTo', select: 'name email' },
            { path: 'assignedFor', select: 'name email' }
          ]})
        .populate({path: 'myReviews',
        populate: { path: 'description' }
    });
        
        
        
       // console.log(user.myReviews);
       // console.log(user.assignedToMe.assignedFor.name);

        res.render('employeeView',{
            assignedToMe:user.assignedToMe,
            myReviews:user.myReviews
        });
    }
    catch(err){
        console.log("err at employees view controller")
        console.log(err);
    }
    
    // return res.send("<h1>welcome home!!</h1>")
}
module.exports.createSession = function(req,res){
    return res.redirect('/employee/home')
}

module.exports.deleteEmployee = async function(req,res){
 console.log(req.params.id);
 let user = await Employee.findByIdAndDelete(req.params.id);
 console.log(user);
 res.redirect("/employee/home");   
}


module.exports.updateEmployeeData=async function(req,res){
try{

     let user = await Employee.findOneAndUpdate({id:req.params.id});
     if(!user){
        console.log("No user to be updated");
        return res.redirect('back')
     }
     user.name=req.body.name;
     user.email=req.body.email;
     user.pasword=req.body.password;
     user.isAdmin=req.body.makeAdmin;
    // console.log(user);
    await user.save();
    console.log("user updated");
    return res.redirect("/employee/home");
     }catch(err){
         console.log(err);
         return res.redirect('back');
     }
}

module.exports.createReview =async function(req,res){
try{
let user = await Employee.findByIdAndUpdate(req.params.id);
let user2 = await Employee.findOne({email:req.body.email});
let admin = await Employee.findByIdAndUpdate(req.user._id);
if(!user || !user2){
    console.log("users not present to be assigned");
    console.log(user)
    console.log(user2)
    res.redirect('back');
}
let assigned = await Assigned.create({
    assignedTo:req.params.id,
    assignedFor:user2.id,
    assignedBy:req.user._id
})
user.assignedToMe.push(assigned);
await user.save();
admin.assignedByMe.push(assigned);
console.log(admin);
await admin.save();

return res.redirect("/employee/home");
}catch(err){
    console.log(err);
}

}

module.exports.reviewPage = function(req,res){
    return res.render('reviewPage',{
        id:req.params.id
    })
}


module.exports.addReview = async function(req,res){
    try{
        //console.log(req.user);
        let user = await Employee.findByIdAndUpdate(req.user._id);
        let user2 = await Employee.findByIdAndUpdate(req.params.id);
        if(!user || !user){
            console.log("no user to add review");
            return res.redirect('/employee/home');
        }
        let newReview = await Review.create({
            description:req.body.review,
            reviewBy:req.user._id,
            reviewFor:req.params.id
        });
        user.reviewByMe.push(newReview);
        let doneAssigned = await Assigned.findOneAndDelete({ assignedTo: req.user._id }).exec();
    if (!doneAssigned) {
      return res.status(404).send({ message: 'Task not found' });
    }
    console.log(doneAssigned);
    //doneAssigned.remove();
       //await user.assignedToMe.pull(doneAssigned);
       await Employee.findByIdAndUpdate(user._id,{$pull : {assignedToMe:doneAssigned._id}});
        await user.save();
        console.log(user);
        user2.myReviews.push(newReview);
        await user2.save();
        console.log("***************************************")
        return res.redirect('/employee/home');
    }catch(err){
        console.log(err);
        return res.redirect('back');
    }
}
module.exports.editReviewPage=function(req,res){
    return res.render('editReviewPage',{
        id:req.params.id
    });
}

module.exports.editReview=async function(req,res){
    try{
        let review = await Review.findByIdAndUpdate(req.params.id);
        //console.log(review);
        if(!review){
            return res.redirect('back');
        }
        review.description=req.body.review;
        await review.save();
        //console.log(review);
        return res.redirect('/employee/home');
    }catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.deleteReview = async function(req,res){
    try{
        let review = await Review.findByIdAndDelete(req.params.id);
        let reviewFor = await Employee.findByIdAndUpdate(review.reviewFor,{$pull : {myReviews:review._id}});
        let reviewBy =  await Employee.findByIdAndUpdate(review.reviewBy,{$pull : {reviewByMe:review._id}});

        console.log(reviewBy);
        console.log(reviewFor);
        return res.redirect('/employee/home');

    }catch(err){
        console.log(err);
        return res.redirect(err);
    }

}