var db = require('../../config/config');
var initModels = require('../models/init-models');
var models = initModels(db)
const APIError = require('../errors/api-error');
const httpStatus = require('http-status');
const { Op } = require("sequelize");


exports.create = async (Data) => {
    try {
        await db.authenticate()
        await models.fooditem.create(Data)
        return {
            response: true
        }
    } catch (error) {
        console.log(error.message)
        return {
            response: false,
            error: new APIError({
                status:httpStatus.BAD_REQUEST||httpStatus.INTERNAL_SERVER_ERROR,
                message:error.message||"INTERAL SERVER ERROR"
            })
        }
    }
};

exports.active = async () => {
    try {
        await db.authenticate();
        var result = await models.fooditem.findAll({where:{IsActive:true}})
        if (result !== null) {
            return {
                response: true,
                data: result
            }
        } else {
            return { resposne: false, error: new APIError(httpStatus.NOT_FOUND) }
        }
    } catch (error) {
        console.log(error.message)
        return { resposne: false, error: new APIError(httpStatus.INTERNAL_SERVER_ERROR) }
    }
}

exports.id = async (id) => {
    try {
        await db.authenticate();
        var result = await models.fooditem.findOne({
            where: { FoodItemID: id,IsActive:true }
        })
        if (result == null||result.length==0) {
            return {
                resposne: false, error: new APIError({
                    message: "NOT FOUND",
                    status: httpStatus.NOT_FOUND
                })
            }
        }
        return {
            response: true,
            data: result
        }
    } catch (error) {
        console.log(error.message)
        return { response: false, error: new APIError(httpStatus.INTERNAL_SERVER_ERROR) }
    }
}
exports.delete = async (id) => {
    try {
        await db.authenticate();
        var result = await models.fooditem.update({IsActive:false},{
            where: { FoodItemID: id }
        })
        if (result == null||result.length==0) {
            return {
                resposne: false, error: new APIError({
                    message: "NOT FOUND",
                    status: httpStatus.NOT_FOUND
                })
            }
        }
        return {
            response: true,
            data: result
        }
    } catch (error) {
        return { response: false, error: new APIError(httpStatus.INTERNAL_SERVER_ERROR) }
    }
}
exports.update = async (Data) => {
    try {
        await db.authenticate();
        var result = await models.fooditem.findOne({ where: { FoodItemID: Data.FoodItemID } })
        
        if (result == null) {
            return {
                resposne: false, error: new APIError({
                    message: "NOT FOUND",
                    status: httpStatus.NOT_FOUND
                })
            }
        } else {
            await models.fooditem.update(Data, { where: { FoodItemID: Data.FoodItemID } })
            return { response: true }
        }

    } catch (error) {
        console.log(error.message)
        return { resposne: false, error: new APIError(httpStatus.INTERNAL_SERVER_ERROR) }

    }
};

exports.itemsByUserId = async (id) => {
    try {
        await db.authenticate();
         var result = await models.fooditem.findAll({
            where: { UserID: id,IsActive:true }
        })
        if (result == null||result.length==0) {
            return {
                resposne: false, error: new APIError({
                    message: "NOT FOUND",
                    status: httpStatus.NOT_FOUND
                })
            }
        }
        return {
            response: true,
            data: result
        }
    } catch (error) {
        console.log(error.message)
        return { response: false, error: new APIError(httpStatus.INTERNAL_SERVER_ERROR) }
    }
}

exports.notificationDates = async (id) => {
    try {
        await db.authenticate();
        var result = await models.fooditem.findAll({ where: { UserID: id } })
        if (result == null) {
            return {
                resposne: false, error: new APIError({
                    message: "NOT FOUND",
                    status: httpStatus.NOT_FOUND
                })
            }
        } else {
            for(var i=0;i<result.length;i++){
                if(result[i].NotifyDate!=null){
                     dif=Math.abs( new Date(result[i].ExpiryDate)-new Date(result[i].NotifyDate))
                     days = dif/(1000 * 3600 * 24)
                     result[i].dataValues.DaysRemaining=days

                }
            }
            return { 
                response: true,
                data:result
             }
        }

    } catch (error) {
        console.log(error.message)
        return { resposne: false, error: new APIError(httpStatus.INTERNAL_SERVER_ERROR) }

    }
};

exports.allNonExpiredItems = async (id) => {
    try {
        var dateToday=new Date();
        await db.authenticate();
        await models.fooditem.update({IsExpired:true},{where:{ExpiryDate:{ [Op.lte]: dateToday}}})
        var result = await models.fooditem.findAll({ where: { IsActive: true,UserID:id } })
        if (result == null) {
            return {
                resposne: false, error: new APIError({
                    message: "NOT FOUND",
                    status: httpStatus.NOT_FOUND
                })
            }
        }
        return { response: true,
        data:result }


    } catch (error) {
        console.log(error.message)
        return { resposne: false, error: new APIError(httpStatus.INTERNAL_SERVER_ERROR) }

    }
};



