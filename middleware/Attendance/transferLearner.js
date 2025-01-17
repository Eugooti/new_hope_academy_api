const {handleErrors, itemNotFound} = require("../../handlers/errorHandlers");
const transferLearner = async (model,req,res) => {
  try {
      const {admNo,newClassroom} = req.body;
      const classroomNo = req.params.id;

      const findCurrentClassroom = await model.findOne({classroomNo});

      if (!findCurrentClassroom) {
          return itemNotFound(res,"Current classroom ")
      }

      const learnerData = await findCurrentClassroom.learners.find(item=>item.admNo.toString() === admNo.toString())

      if (!learnerData) {
          return itemNotFound(res,"Learner ")
      }

      const findNewClassroom = await model.findOne({classroomNo:newClassroom});

      if (!findNewClassroom) {
          return itemNotFound(res,"New classroom ")
      }

      const learnerIndex = findCurrentClassroom.learners.findIndex(item=>item.admNo.toString() === admNo.toString());

      const isLearnerAlreadyAdded = findNewClassroom.learners.some(item=>item.admNo.toString() === admNo.toString());

      findCurrentClassroom.learners.splice(learnerIndex, 1);

      if (isLearnerAlreadyAdded){

          findCurrentClassroom.markModified("learners");
          findCurrentClassroom.save()
          return res.status(200).json({
              success:true,
              message:"Learner already added"
          })
      }

      findNewClassroom.learners.push(learnerData)
      findCurrentClassroom.markModified("learners");
      findNewClassroom.markModified("learners");
      findCurrentClassroom.save()
      findNewClassroom.save();

      return res.status(200).json({
          success:true,
          message: 'Learner transferred successfully',
      })

  }catch(err) {
      return handleErrors(res,err)
  }
}

module.exports = {transferLearner}