// exports.create = (req,res)=>{
//     res.send({message:"post created"});
// };
const CommentServices = require("../services/comment.service");
const mongoDB = require("../utils/mongodb.util");
//const apiError = require("../api-error");
const ApiError = require("../api-error");

exports.create = async (req,res,next)=>{
    try{
        const commentServices = new CommentServices(mongoDB.client);
        const document = await commentServices.create(req.body);
        return res.send(document);
    } catch(e){
        return next(new ApiError(500,"An error occured"));
    }
}

exports.findAll = async (req,res,next)=>{
    try{
        const postServices = new CommentServices(mongoDB.client);
        const document = await postServices.findByPostId(req.params.id);
        return res.send(document);
    } catch(e){
        return next(new ApiError(500,"An error occured"));
    }
}

// exports.findOne = async (req,res,next)=>{
//     try{
//         const postServices = new CommentServices(mongoDB.client);
//         const document = await postServices.findById(req.params.id);
//         return res.send(document);
//     } catch(e){
//         return next(new ApiError(500,"An error occured"));
//     }
// }

exports.delete = async (req,res,next)=>{
    try{
        const postServices = new CommentServices(mongoDB.client);
        const document = await postServices.delete(req.params.id);
        return res.send(document);
    } catch(e){
        return next(new ApiError(500,"An error occured"));
    }
}