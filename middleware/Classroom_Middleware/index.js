const {crudMethods} = require("../CRUDmiddleware");
const {addLearner} = require("./addLearner");

const classRoomMethods = (model) => {
  const methods = {...crudMethods(model)};

  methods.addLearner= async (req,res)=>{
      await addLearner(model,req,res)
  }

  return methods
}

module.exports = {classRoomMethods}
