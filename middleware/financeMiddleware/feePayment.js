const {handleErrors, itemNotFound} = require("../../handlers/errorHandlers");
const {formatDate} = require("../../utils/formatDate");
const feePayment =async (model,req,res) => {
  try {
      const date = formatDate();
      const {amountPaid} = res.body;
      const admNo = req.params.id;

      const findStudent = await  model.findOne({admNo});

      if (!findStudent) {
          return itemNotFound(res)
      }

      findStudent.lastPaidAmount = amountPaid;
      findStudent.dueAmount -= amountPaid;
      findStudent.lastPaymentDate=date;
      findStudent.dueAmount === 0? findStudent.paymentStatus="Settled":findStudent.paymentStatus="Partially Paid"
      findStudent.paymentHistory.push(req.body)

      findStudent.markModified("lastPaidAmount")
      findStudent.markModified("dueAmount")
      findStudent.markModified("lastPaymentDate")
      findStudent.markModified("dueAmount")
      findStudent.markModified("paymentHistory")

      const  result = await findStudent.save()

      if (!result){
          return res.status(400).json({
              success:false,
              message:"Failed to save"
          })
      }

      return res.status(200).json({
          success:true,
          message:"Saved successfully",
          result
      })



  }catch (error) {
      return handleErrors(res,error)
  }
}

module.exports = {feePayment}