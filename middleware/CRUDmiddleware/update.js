const {handleErrors, itemNotFound} = require('../../handlers/errorHandlers')

const update = async (model,req,res) => {
  try {
      const {id} = req.params;

      const result = await model.findByIdAndUpdate(id,{$set :{...req.body}},{new:true});

      if (!result){
          return itemNotFound(res)
      }

      return res.status(200).json({
          success:true,
          message:"Document updated",
          result:result
      })

  }catch (error) {
      return handleErrors(res,error)
  }
}

const updateByLearner = async (model, req, res) => {
    try {
        const admNo = req.params.id;
        const result = await model.findOneAndUpdate({ admNo }, req.body, {
            new: true,
            runValidators: true,
        });

        if (!result) {
            return itemNotFound(res);
        } else {
            return res.status(200).json({
                success: true,
                result,
                message: "Updated successfully",
            });
        }
    } catch (error) {
        return handleErrors(res, error);
    }
};


const updateByStaff = async (model,req,res)=>{
    try {

        const employeeNo = req.params.id;

        const result = await model.findOneAndUpdate({employeeNo},req.body,{
            new:true,
            runValidators:true
        })

        if (!result){
            return itemNotFound(res)
        }

        return res.status(200).json({
            success:false,
            message:"Updated Successfully."
        })

    }catch (error) {
        return handleErrors(res,error)
    }
}


module.exports = {update,updateByLearner,updateByStaff}
