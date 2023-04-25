// exports.create = (req,res)=>{
//     res.send({message:"created"});
// };

const ContactServices = require("../services/contact.services");
const mongoDB = require("../utils/mongodb.util");
//const apiError = require("../api-error");
const ApiError = require("../api-error");

exports.create = async (req,res,next)=>{
    if(!req.body?.username){
        return next(new ApiError(400,"Username can't be empty"));
    }
    if(!req.body?.pass){
        return next(new ApiError(400,"Password can't be empty"));
    }
    try{
        const contactServices = new ContactServices(mongoDB.client);
        const existed = await contactServices.findByUserName(req.body.username);
        if(existed){
            return next(new ApiError(500,"Username existed"));
        }
        const document = await contactServices.create(req.body);
        return res.send('created');
    } catch(e){
        return next(new ApiError(500,"An error occured"));
    }
}

// exports.finOne = (req,res)=>{
//     res.send({message:"found"});
// };

exports.finOne = async(req,res,next)=>{
    try{
        const contactServices = new ContactServices(mongoDB.client);
        const document = await contactServices.findByUserName(req.params.id)
        if(document){
            return res.send(document);
        }
        else{
            return res.send({message:"not found"});
        }
    }catch(e){
        return next(new ApiError(500,"Can't retrieve contact with this id"));
    }
};

// exports.update = (req,res)=>{
//     res.send({message:"updated"});
// };

exports.update = async (req,res,next)=>{
    if(Object.keys(req.body).length===0){
        return next(new  ApiError(400,"Data to update can't be empty"));
    }
    try{
        const contactServices = new ContactServices(mongoDB.client);
        const document = await contactServices.update(req.params.id,req.body);
        if(!document){
            return next(new ApiError(404,"Contact not found"));
        }
        return res.send(document);
    } catch(e){
        return next(new ApiError(500,"Update error"));
    }
};

exports.delete = (req,res)=>{
    res.send({message:"deleted"});
};