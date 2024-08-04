const {handleErrors, itemNotFound} = require('../../handlers/errorHandlers')

const remove = async (model,req,res) => {
  try {
      const {id} = req.params;
      const result = await model.findByIdAndDelete(id)

      if (!result){
          return res.status(404).json({
              success:false,
              message:"Document not found"
          })
      }

      return res.status(200).json({
          success:true,
          message:"Document deleted."
      })

  }catch (error) {
      return handleErrors(res,error)
  }
}

const removeByLearnerAdmNo = async (model,req,res)=>{
    try {
        const admNo = req.params.id
        let updates = {
            removed: true,
        };
        const result = await model.findOneAndDelete({admNo},
            {$set:updates},
            {new:true}).exec()

        if (!result){
            return res.status(404).json({
                success:false,
                message:"Document not found."
            })
        }

        return res.status(200).json({
            success:true,
            message:"Document delete successfully"
        })

    }catch (error) {
        return handleErrors(res,error)
    }
}

const removeByStaffId = async (model,req,res) => {
  try {
      const employeeNo = req.params.id;

      let updates = {
          removed: true,
      };

      const result = await model.findOneAndDelete(
          {employeeNo},
          {$set:updates},
          {new:true}).exec()

      if (!result){
          return  itemNotFound(res,"Record")
      }

      return res.status(200).json({
          success:true,
          message:"Document deleted successfully"
      })

  }catch (error) {
      return handleErrors(res,error)
  }
}


module.exports = {remove,removeByLearnerAdmNo,removeByStaffId}
