const {handleErrors, itemNotFound} = require("../../handlers/errorHandlers");
const addToRecord =async (model,req,res) => {
  try {

      const id = req.params.id

      const result = await model.findByIdAndUpdate(
          id,
          {$addToSet:{offences: {$each:req.body}}},
          {new:true,upsert:true}
      )

      if (!result){
          return itemNotFound(res)
      }

      return res.status(200).json({
          success:true,
          message:"Record added successfully",
          result:result
      })


  }catch (error) {
      return handleErrors(res,error)
  }
}

module.exports = {addToRecord}
