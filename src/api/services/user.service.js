var db = require('../../config/config');
var initModels = require('../models/init-models');
var models = initModels(db)
const APIError = require('../errors/api-error');
const httpStatus = require('http-status');


exports.register = async (Data) => {
    try {
        await db.authenticate()
        await models.user.create(Data)
        return {
            response: true
        }
    } catch (error) {
        console.log(error.message)
        return {
            response: false,
            error: new APIError({
                status: httpStatus.BAD_REQUEST || httpStatus.INTERNAL_SERVER_ERROR,
                message: error.message || "INTERAL SERVER ERROR"
            })
        }
    }
};

exports.update = async (Data) => {
    try {
        await db.authenticate();
        var result = await models.user.findOne({ where: { UserID: Data.UserID } })
        if (result == null) {
            return {
                resposne: false, error: new APIError({
                    message: "NOT FOUND",
                    status: httpStatus.NOT_FOUND
                })
            }
        } else {
            await models.user.update(Data, { where: { UserID: Data.UserID } })
            return { response: true }
        }

    } catch (error) {
        console.log(error.message)
        return { resposne: false, error: new APIError(httpStatus.INTERNAL_SERVER_ERROR) }

    }
};

exports.delete = async (id) => {
    try {
        await db.authenticate();
        var result = await models.user.findOne({ where: { UserID: id } })
        if (result == null) {
            return {
                resposne: false, error: new APIError({
                    message: "NOT FOUND",
                    status: httpStatus.NOT_FOUND
                })
            }
        } else {
            await models.user.update({IsActive:false}, { where: { UserID: id } })
            return { response: true }
        }

    } catch (error) {

        return { resposne: false, error: new APIError(httpStatus.INTERNAL_SERVER_ERROR) }

    }
};
exports.id = async (id) => {
    try {
        await db.authenticate();
        var result = await models.user.findOne({
            where: { UserID: id,IsActive:true },
            include: [{
                model: models.fooditem,
                as: "fooditems"
            }]
        })
        if (result == null) {
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

exports.active = async () => {
    try {
        await db.authenticate();
        var result = await models.user.findAll({where:{IsActive:true}}
            ,{
            include: [{
                model: models.fooditem,
                as: "fooditems"
            }]
        })
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

exports.login = async (Data) => {
    try {
        await db.authenticate()
        var result = await models.user.findOne({
            where: { Email: Data.Email, Password: Data.Password },
            include: [{
                model: models.fooditem,
                as: "fooditems"
            }]
        })
        if (result != null) {
            return {
                data: result,
                response: true
            }
        } else {
            return {
                response: false,
                error: new APIError({
                    status: httpStatus.NOT_FOUND,
                    message: "Incorrect Email or Passowrd"
                })

            }
        }

    } catch (error) {
        console.log(error.message)
        return {
            response: false,
            error: new APIError({
                status: httpStatus.INTERNAL_SERVER_ERROR
            }
            )
        }
    }
};