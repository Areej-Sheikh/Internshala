exports.generatedErrors=(err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({errName: err.name,message: err.message});
}