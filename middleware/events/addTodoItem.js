const {handleErrors} = require("../../handlers/errorHandlers");
const addTodoItem =async (model,req,res) => {
  try {
      const employeeNo = req.params.id;

      let record = await model.findOneAndUpdate({employeeNo})

      if (!record){
          record = new model({employeeNo,reminders:[req.body]})
      }else {
          record.reminders.push(req.body)
          record.markModified("reminders")
      }

      const result = await record.save()

      if (!result){
          return res.status(400).json({
              success:false,
              message:"Unable to perform operation. Try again later"
          })
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

module.exports = {addTodoItem}
