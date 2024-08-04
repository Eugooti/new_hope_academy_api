const {handleErrors} = require("../../handlers/errorHandlers");

/**
 * required fields
 * books,
 * handler,
 * returnDate
 **/


const bookBorrowing =async (model,req,res) => {
    try {

        const borrowerId = req.params.id;


        let borrowerRecord  = await model.findOne({borrowerId})

        if (!borrowerRecord ){
            borrowerRecord  = new model({ borrowerId, record: [req.body] });
        }else {
            borrowerRecord .record.push(req.body)
        }

        const result = await borrowerRecord.save()

        if (!result){
            return res.status(400).json({
                success:false,
                message:"Unable to perform operation. Try again later"
            })
        }

        return res.status(200).json({
            success:true,
            message:"Books borrowed successfully",
            result:result
        })

    }catch (error) {
        return handleErrors(res,error)
    }

}

module.exports = {bookBorrowing}

