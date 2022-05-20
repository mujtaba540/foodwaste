const httpStatus = require('http-status');
const appointments = require('../services/appointment.service');
const APIError = require('../errors/api-error');
const { isEmpty } = require('lodash');


exports.create = async (req, res, next) => {
  try {
    var Data = req.body;
    if(Data==undefined||isEmpty(Data))return next(new APIError({
      status:httpStatus.BAD_REQUEST,
      message:"BAD REQUEST"
    }))
    Data.IsActive=true
    var result=await appointments.create(Data);
    if(result.response){
        res.status(httpStatus.CREATED);
        res.json({
            Status:{code:httpStatus.OK,"message":"Success"},
            Data:{}
        })
    }else{
        return next(result.error)
    }
    
} catch (error) {
    return next(error)
       
  }
};



exports.all = async(req,res,next)=>{
  try{
      var result=await appointments.active()
      if(result.response){
          res.status(httpStatus.OK).json({
             Status:{ code:httpStatus.OK,
              message:"Success"},
              Data:{data:result.data}
          })
      }else{
        return next(result.error)
      }
}catch(error){
  return next(error)
}
}


exports.id=async(req,res,next)=>{
  try{
    var id=req.params.id
    var result=await appointments.id(id)
    if(result.response){
        res.status(httpStatus.OK).json({
            Status:{code:httpStatus.OK,
            message:"Success"},
            Data:{data:result.data}
        })
    }else{
      return next(result.error)
    }
}catch(error){
return next(error)
}
}

exports.delete=async(req,res,next)=>{
  try{
    var id=req.params.id
    var result=await appointments.delete(id)
    if(result.response){
        res.status(httpStatus.OK).json({
            Status:{code:httpStatus.OK,
            message:"Success"},
            Data:{}
        })
    }else{
      return next(result.error)
    }
}catch(error){
return next(error)
}
}


exports.checkAvailability=async(req,res,next)=>{
  try{
    var Data=req.body
    var result=await appointments.checkAvailability(Data)
    if(result.response){
        res.status(httpStatus.OK).json({
            Status:{code:httpStatus.OK,
            message:"Success"},
            Data:{message:"Available"}
        })
    }else{
      res.status(httpStatus.OK).json({
        Status:{code:httpStatus.OK,
        message:"Success"},
        Data:{message: "Doctor Not Available"}
    })

    }
}catch(error){
return next(error)
}
}
