const {addToRecord} = require("./create");
const {crudMethods} = require("../CRUDmiddleware");

const disciplinaryMethods = (model) => {
  const methods = {...crudMethods(model)};

  methods.addToRecord = async (req,res)=>{
      await addToRecord(model,req,res)
  }

  return methods
}

module.exports = {disciplinaryMethods}
