const {handleErrors} = require("../../handlers/errorHandlers");
const IdGenerator = require("../../utils/idGenerator");
const createVendor = (model,req,res) => {
  try {
      const idGenerator = new IdGenerator()

      const result = new model({...req.body,vendorId:idGenerator.generateVendorId()});

      if (!result){
          return res.status(400).json({
              success:false,
              message:"Unable to create Vendor."
          })
      }

      return res.status(200).json({
          success:true,
          message:"Vendor Create successfully",
          result
      })

  }catch(err) {
      return handleErrors(res,err)
  }
}

module.exports = {createVendor}