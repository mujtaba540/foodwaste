const httpStatus = require('http-status');
const journal = require('../services/journal.service');
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
    var result=await journal.create(Data);
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
      var result=await journal.active()
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
    var result=await journal.id(id)
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