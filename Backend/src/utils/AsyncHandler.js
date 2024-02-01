const { ApiError } = require("./ApiError")

const AsyncHandler =(fun) => async (req,res,next) =>{
    try {
        await fun(req, res, next)
    } catch (error) {
        throw new ApiError(500, error)
    }
}

module.exports = {AsyncHandler};