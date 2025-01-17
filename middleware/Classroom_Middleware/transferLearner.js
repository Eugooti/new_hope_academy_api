const {itemNotFound, handleErrors} = require("../../handlers/errorHandlers");

const transferLearner = async (model,req,res) => {
    try {
        const {admNo,newClassroom} = req.body;
        const classroomNo = req.params.id

        const findCurrentClassroom = await model.findOne({classroomNo});

        if (!findCurrentClassroom) {
            return itemNotFound(res,"Current classroom ")
        }

        const learnerData = await findCurrentClassroom.learners.find(item=>item.admNo.toString() === admNo.toString())

        console.log(learnerData)

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
            if (learnerData.gender === "Male"){
                findCurrentClassroom.population.male-=1
                findCurrentClassroom.population.total-=1
            }else {
                findCurrentClassroom.population.female-=1
                findCurrentClassroom.population.total-=1
            }

            findCurrentClassroom.markModified("learners");
            findCurrentClassroom.markModified("population");

            findNewClassroom.markModified("learners");
            findNewClassroom.markModified("population");

            findCurrentClassroom.save()
            findNewClassroom.save();

            return res.status(200).json({
                success:true,
                message:"Learner already added."
            })
        }

        findNewClassroom.learners.push(learnerData)

        if (learnerData.gender === "Male"){
            findCurrentClassroom.population.male-=1
            findCurrentClassroom.population.total-=1
            findNewClassroom.population.male+=1
            findNewClassroom.population.total+=1
        }else {
            findCurrentClassroom.population.female-=1
            findCurrentClassroom.population.total-=1
            findNewClassroom.population.female+=1
            findNewClassroom.population.total+=1
        }



        findCurrentClassroom.markModified("learners");
        findCurrentClassroom.markModified("population");

        findNewClassroom.markModified("learners");
        findNewClassroom.markModified("population");

        findCurrentClassroom.save()
        findNewClassroom.save();

        return  res.status(200).json({
            success: true,
            message: 'Learner transferred successfully',
        })

    }catch(err) {
        return  handleErrors(res,err)
    }

}

module.exports = {transferLearner}