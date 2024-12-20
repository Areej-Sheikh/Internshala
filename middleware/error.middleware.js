exports.generatedErrors=(err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    if(err.name === "MongoServerError" && err.message.includes("E11000 duplicate key"))
        {
            return err.message = "Student with this email address already exists"
        }
    res.status(statusCode).json({errName: err.name,message: err.message});
}