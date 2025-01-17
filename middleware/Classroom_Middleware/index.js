const {crudMethods} = require("../CRUDmiddleware");
const {addLearner} = require("./addLearner");
const {transferLearner} = require("./transferLearner");

const classRoomMethods = (model) => {
  const methods = {...crudMethods(model)};

  methods.addLearner= async (req,res)=>{
      await addLearner(model,req,res)
  }

  methods.transferLearner = async (req,res)=>{
      await transferLearner(model,req,res)
  }

  return methods
}

module.exports = {classRoomMethods}
