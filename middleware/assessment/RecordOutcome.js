const {handleErrors, itemNotFound} = require("../../handlers/errorHandlers");
const RecordOutcome = async (model,req,res) => {
  try {
      const id = req.params.id;
      const {data} = req.body

      const record = await model.findById(id);

      if (!record) {
          return itemNotFound(res);
      }

      const newData = data.map(item => ({
          subject:item.subject,
          totals:item.total,
          meanScore:item.meanscore,
          learners:item.learners,
      }))


      record.outcome = newData;


      record.save()

      return res.status(200).json({
          success: true,
          message: 'Outcome updated Successfully',
          result:record
      });


  }catch(err){
      return handleErrors(res,err)
  }
}

module.exports = {RecordOutcome};