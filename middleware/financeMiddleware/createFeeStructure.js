const {handleErrors} = require("../../handlers/errorHandlers");

const createFeeStructure = async (model,req,res) => {
  try {
      const {feeItems} = req.body
      const total = feeItems.reduce((sum,item)=> sum + item.amount,0)

      const result = await new model({...req.body,total}).save();

      return res.status(200).json({
          success:true,
          result,
          message: 'Successfully created'
      })


  }catch(error){
      return handleErrors(res,error)
  }
}

module.exports = {createFeeStructure}