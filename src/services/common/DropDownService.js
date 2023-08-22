const DropDownService= async (Request,DataModel,Projection) => {
    try{
        let UserEmail=Request.headers['email'];
        let data = await DataModel.aggregate([
            {$match: {UserEmail:UserEmail}},
            {$project:Projection}
        ],{ maxTimeMS: 20000 })
        return {status: "success", data: data}
    }
    catch (error) {
        return {status: "fail", data: error}
    }
}
module.exports=DropDownService