const {handleErrors, itemNotFound} = require('../../handlers/errorHandlers')

const read = async (model,req,res) => {
  try {
      const result = await model.find();

      return res.status(200).json({
          success: true,
          result: result,
      });

  }catch(err){
      return handleErrors(res,err)
  }
}


const readById = async (model,req,res) => {
    try {
        const {id} = req.params
        const result = await model.findById(id)

        if (!result){
            return itemNotFound(res)
        }

        return res.status(200).json({
            success:true,
            result:result
        })

    }catch(err){
        return handleErrors(res,err)
    }
}

const readDataByLearnerAdmissionNumber = async (model,req,res)=>{
    try {
        const admNo = req.params.id;
        const result = await model.findOne({admNo})
        if (!result){
            return itemNotFound(res)
        }
        return res.status(200).json({
            success:true,
            result:result
        })

    }catch (error) {
        return handleErrors(res,error)
    }
}

const readDataByStaffEmployeeNumber = async (model,req,res) => {
    try {
        const employeeNo = req.params.id

        const result = await model.findOne({employeeNo})

        if (!result){
            return itemNotFound(res)
        }

        return res.status(200).json({
            success:true,
            result
        })

    }catch (error) {

        return handleErrors(res,error)

    }
}

const readByClassroomNo =async (model,req,res) => {
  try {
      const classroomNo = req.params.id

      const result = await model.findOne({classroomNo})

      if (!result){
          return itemNotFound(res)
      }

      return res.status(200).json({
          success:true,
          result:result
      })

  }catch (error) {
      return handleErrors(res,error)
  }
}


module.exports = {read,readById,readDataByLearnerAdmissionNumber,readDataByStaffEmployeeNumber,readByClassroomNo}
