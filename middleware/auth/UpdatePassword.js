const crypto = require('crypto');
const {itemNotFound, handleErrors} = require("../../handlers/errorHandlers");
const UpdatePassword = async (model,req,res) => {
  try {
      const employeeNo = req.params.id
      const password = req.body.password;
      const salt = crypto.randomBytes(16).toString('hex');
      const hashedPassword = crypto.createHash('sha256').update(password + salt).digest('hex');
      const result = await model.findOneAndUpdate(
          {employeeNo},
          { $set: { password: hashedPassword, salt } },
          {new:true}
      )

      if (!result){
          return itemNotFound(res)
      }

      return res.status(200).json({
          success:true,
          message:"Password updated successfully.",
          result:result
      })

  }catch (error) {
      console.log(error)
      return handleErrors(res,error)
  }
}

module.exports = {UpdatePassword}