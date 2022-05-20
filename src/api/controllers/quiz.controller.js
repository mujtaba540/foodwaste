const httpStatus = require('http-status');
const quiz = require('../services/quiz.services');
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
    var result=await quiz.create(Data);
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
  console.log(error)
    return next(error)
       
  }
};



exports.all = async(req,res,next)=>{
  try{
      var result=await quiz.active()
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
    var result=await quiz.id(id)
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