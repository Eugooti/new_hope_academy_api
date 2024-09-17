const {handleErrors, itemNotFound} = require("../../handlers/errorHandlers");
const removeTodoItem =async (model,req,res) => {
  try {
      const employeeNo = req.params.id;
      const {id} = req.body

      const result = await model.findOne({employeeNo})

      if (!result){
          return itemNotFound(res)
      }

      const index = result.reminders.findIndex(item =>item._id.toString() === id)

      if (!index>-1){
          return itemNotFound(res)
      }else if (index >- 1){
          result.reminders.splice(index,1)
      }
      const result2 =await result.save()

      return res.status(200).json({
          success:true,
          message:"Item removed successfully",
          result:result2
      })

  }catch (error) {
      return handleErrors(res,error)
  }
}

module.exports = {removeTodoItem}
