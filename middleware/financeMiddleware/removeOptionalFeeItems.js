const {handleErrors, itemNotFound} = require("../../handlers/errorHandlers");
const removeOptionalFeeItems =async (model,req,res) => {
  try {

      const admNo = req.params.id;

      const findLearner = await  model.findOne({admNo});

      if (findLearner) {
          return itemNotFound(res)
      }

      const findIndex = findLearner.optionalFeeItems.findIndex(item=>item._id.toString === req.body.id)
      if (findIndex>-1){
          return itemNotFound(res)
      }

      const feeItem = findLearner.optionalFeeItems[findIndex];

      findLearner.totalAmount -= feeItem.amount;
      findLearner.dueAmount -= feeItem.amount;
      findLearner.dueAmount === 0? findLearner.paymentStatus="Settled":findLearner.paymentStatus="Partially Paid"
      findLearner.optionalFeeItems.splice(findIndex,1);

      findLearner.markModified("totalAmount")
      findLearner.markModified("dueAmount")
      findLearner.markModified("paymentStatus")
      findLearner.markModified("optionalFeeItems")

      const result = await findLearner.save()

      if (!result){
          return res.status(400).json({
              success:false,
              message:"Unable to perform operation"
          })
      }

      return res.status(200).json({
          success:true,
          message:"Fee record updated",
          result
      })

  }catch(err){
      return handleErrors(res, err);
  }
}
module.exports = {removeOptionalFeeItems}