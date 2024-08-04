const {crudMethods} = require("../CRUDmiddleware");
const {addTodoItem} = require("./addTodoItem");
const {removeTodoItem} = require("./removeTodoItem");
const eventsMethods = (model) => {
  const methods = {...crudMethods(model)}

    methods.addTodoItem = async (req,res)=>{
      await addTodoItem(model,req,res)
    }

    methods.removeTodoItem = async (req,res)=>{
      await removeTodoItem(model,req,res)
    }

    return methods;
}

module.exports = {eventsMethods}
