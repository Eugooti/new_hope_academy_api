const {handleErrors, itemNotFound} = require("../../handlers/errorHandlers");
const addClinicRecord = async (model,req,res) => {
  try {

      const admNo = req.body.id

      const result = await model.findOneAndUpdate(
          {admNo},
          {$addToSet:{visits:{$each:req.body}}},
          {new:true,upsert:true})

      if (!result){
          return itemNotFound(res)
      }

      return res.status(200).json({
          success:true,
          message:"Record added",
          result:result
      })

  }catch (error) {
      return handleErrors(res,error)
  }
}

module.exports = {addClinicRecord}
