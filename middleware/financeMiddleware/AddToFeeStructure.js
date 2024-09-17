const {handleErrors, itemNotFound} = require("../../handlers/errorHandlers");
const addToFeeStructure = async (model,req,res) => {
  try {
      const findFeeStructure = await model.findById(req.params.id);

      if (!findFeeStructure){
          return itemNotFound(res)
      }

      const isFeeItemAdded = findFeeStructure.feeItems.some(item=>item.name === req.body.name);

      if (isFeeItemAdded){
          return res.status(200).json({
              success:true,
              message:"Item already added"
          })
      }

      findFeeStructure.feeItems.push(req.body)

      findFeeStructure.total = findFeeStructure.feeItems.reduce((sum,item)=> sum+ item.amount,0)

      findFeeStructure.markModified("feeItems")
      findFeeStructure.markModified('total')

      const result = await findFeeStructure.save();

      if (!result){
          return res.status(400).json({
              success:false,
              message:"Failed to save"
          })
      }

      return res.status(200).json({
          success:true,
          message:"Saved successfully",
          result:result
      })



  }catch (error) {
      return handleErrors(res,error)
  }
}

module.exports = {addToFeeStructure}