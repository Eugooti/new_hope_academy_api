const {handleErrors} = require("../../handlers/errorHandlers");
const learnerFee =async (model,req,res) => {
  try {
      const {feeStructure,optionalFeeItems} = res.body;

      const total = optionalFeeItems.reduce((total, item) => total + item.amount,0)

      const result = await new model({
          ...req.body,
          totalAmount: total+feeStructure.total
      }).save();

      return res.status(200).json({
          success: true,
          result,
          message: 'Successfully created'
      })

  }catch(error){
      return handleErrors(res,error)
  }
}

module.exports = {learnerFee}