

module.exports.updatePage=function(req,res){
    res.render("updatePage",{
        empID:req.params.id
    });
}

module.exports.assignPage=function(req,res){
    res.render("assignpage",{
        to:req.params.id
    })
}