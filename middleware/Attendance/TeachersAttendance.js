const {handleErrors, itemNotFound} = require("../../handlers/errorHandlers");
const teachersAttendance = async (model,req,res) => {
  try {
      const employeeNo = req.params.id;
      const result = await model.findOneAndUpdate(
          {employeeNo},
          {$addToSet:{attendanceRecord:{$each:req.body}}},
          {new:true,upsert:true}
      )

      if (!result){
          return itemNotFound(res)
      }

      return res.status(200).json({
          success:true,
          message:"Register marked"
      })

  }catch (error) {
      return handleErrors(res,error)
  }
}
module.exports = {teachersAttendance}
