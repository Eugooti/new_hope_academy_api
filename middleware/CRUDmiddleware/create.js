const {handleErrors} = require('../../handlers/errorHandlers')

const create = async (model,req,res) => {
  try {
      const result = await new model(req.body).save();
      return res.status(201).json({
          success: true,
          result,
          message: 'Successfully Created',
      });

  }catch (error) {
      return handleErrors(res,error)
  }
}

module.exports = {create};
