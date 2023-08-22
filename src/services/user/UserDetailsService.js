const UserDetailsService= async (Request,DataModel) => {
    try {
        let data = await DataModel.aggregate([{$match: {email:Request.headers['email']}}],{ maxTimeMS: 20000 })
        return  {status: "success", data: data}
    } catch (error) {
        return {status: "fail", data: error.toString()}
    }
}
module.exports=UserDetailsService