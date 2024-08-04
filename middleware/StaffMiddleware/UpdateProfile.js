const UpdateProfile = async (model,req,res) => {
  try {
      const result = await model.findOneAndUpdate(
          {employeeNo:req.body.id,remove:false},
          req.body,
          {runValidators:true,new:true}
      ).exec()



  }catch (error) {
      return res.status(500).json({
          success:false,
          message:error.message,
          error:error
      })
  }
}
