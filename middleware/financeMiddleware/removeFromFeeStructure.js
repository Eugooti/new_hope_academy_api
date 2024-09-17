const {handleErrors, itemNotFound} = require("../../handlers/errorHandlers");

const removeFromFeeStructure = async (model,req,res) => {
    try {
        const findFeeStructure = await model.findById(req.params.id)


        if (!findFeeStructure) {
            return itemNotFound(res)
        }

        const findFeeItemIndex = findFeeStructure.feeItems.findIndex(item=>item._id.toString === req.body.id);

        if (findFeeItemIndex>-1){
            return itemNotFound(res)
        }
        findFeeStructure.feeItems.splice(findFeeItemIndex,1);

        findFeeStructure.total = findFeeStructure.feeItems.reduce((sum,item)=> sum+ item.amount,0)

        findFeeStructure.markModified("feeItems")
        findFeeStructure.markModified('total')

        const result = await findFeeStructure.save()

        if (!result){
            return res.status(400).json({
                success:false,
                message:"Unable to remove item"
            })
        }

        return res.status(200).json({
            success:true,
            message:"Fee item borrowed successfully",
        })


    }catch (error) {
        return handleErrors(res,error)
    }

}

module.exports = {removeFromFeeStructure}