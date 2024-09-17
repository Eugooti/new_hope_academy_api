const {handleErrors} = require('../../handlers/errorHandlers')

const create = async (model,req,res) => {
  try {
      const result = await new model(req.body).save();
      return res.status(200).json({
          success: true,
          result,
          message: 'Successfully Created',
      });

  }catch (error) {
   if (error.code===11000){
          return res.status(400).json({
              success: false,
              result: null,
              message: 'Data already exists',
              error:error
          })
      }

      return handleErrors(res,error)
  }
}

module.exports = {create};
