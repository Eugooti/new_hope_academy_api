const {handleErrors,itemNotFound} = require("../../handlers/errorHandlers");
const addLearnerToClub = async (model,req,res) => {
  try {
      const id = req.params.id
      const result = await model.findById(id)
      const {admNo} = req.body

      if (!result){
          return itemNotFound(res,"Club")
      }

      const findLearner = result.participants.some(item =>item.admNo === admNo)

      if (findLearner){
          return res.status(200).json({
              success:true,
              message:"Learner already added"
          })
      }

      result.participants.push(req.body)

      result.markModified("participants")

      await result.save()

      return res.status(200).json({
          success:true,
          message:"Learner added successfully"

      })


  }catch (error) {
      return handleErrors(res,error)
  }
}

module.exports = {addLearnerToClub}
