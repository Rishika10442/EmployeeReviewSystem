const Employee = require("../models/employee");


module.exports.start=function(req,res){
    return res.render('start');
}



module.exports.signUpPage = function(req,res){
    res.render('signUp');
}

module.exports.signInPage = function(req,res){
    res.render('signIn');
}

module.exports.specialAdmin =async function(req,res){
try{
let emp = await Employee.find({email:"special@gmail.com"});
if(emp.length>0){
    // console.log(emp)
    return res.send("<p>Special User Already Present</p>");

}
await Employee.create({
    name:"SpecialAdmin",
    email:"special@gmail.com",
    password:"special",
    isAdmin:true
})
return res.send("<p> First admin has been created. Email : special@gmail.com , Password: special </p>")

}catch(err){
    console.log(err);
}
}


module.exports.destroySession = async function(req,res){
    req.logout(function(err) {
        if (err) { return next(err); }
        console.log("user signed out");
        res.redirect("/sign-in");
    });
}

module.exports.newEmployee = async function(req,res){
    res.render('newEmployeeCreate')
}