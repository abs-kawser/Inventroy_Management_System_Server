const mongoose = require("mongoose");
const DetailsByIDService= async (Request,DataModel) => {
    try{
        console.log("hello 1")
        let DetailsID=Request.params.id;
        let UserEmail=Request.headers['email'];
            console.log("myID:",DetailsID)
        const ObjectId = mongoose.Types.ObjectId;
        let QueryObject={};
        QueryObject['_id']= new ObjectId(DetailsID);
        QueryObject['UserEmail']=UserEmail;

        console.log(QueryObject);
        
        let data = await DataModel.aggregate([
            {$match: QueryObject}
        ])
        return {status: "success", data: data}
    }
    catch (error) {
        return {status: "fail", data: error}
    }
}
module.exports=DetailsByIDService