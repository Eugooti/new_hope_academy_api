const {handleErrors, itemNotFound} = require("../../handlers/errorHandlers");
const classroomModel = require("../../model/classroom/classroom.model");

const createAssessment = async (model,req,res) => {
  try {
      const {classroom,examName,level,startDate,endDate,timetable,subjects,term,facilitator} = req.body;
      console.log(req.body)

      const findClassroom = await classroomModel.findOne({classroomNo:classroom});

      if (!findClassroom){
          return itemNotFound(res)
      }

      const learnerScores = findClassroom.learners.map(item => ({
          name: item.name,
          admNo:item.admNo,
      }))

      const outcome = subjects.map(item=>({
          subject:item,
          learners:learnerScores
      }))

      const data= {
          examName,
          level,
          classroomNo:classroom,
          startDate,
          endDate,
          timetable,
          outcome,
          term,
          facilitator
      }

      const result = await new model(data).save()

      return res.status(200).json({
          result,
          success:true,
          message:"Record created"
      })

  }catch(err) {
      console.log(err)
      return handleErrors(res, err);
  }
}

module.exports = {createAssessment}