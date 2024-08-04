const {handleErrors, itemNotFound} = require("../../handlers/errorHandlers");
const counselingSession = async (model,req,res) => {
  try {
      const admNo = req.params.id

      const result = await model.findByIdAndUpdate(
          {admNo},
          {$addToSet:{sessions:{$each:req.body}}},
          {new:true,upsert:true}
      )

      if (!result){
          return itemNotFound(res)
      }

      return res.status(200).json({
          success:true,
          message:"Record added"
      })

  }catch (error) {
      return handleErrors(res,error)
  }
}
module.exports = {counselingSession}
