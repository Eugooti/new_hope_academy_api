const mongoose = require('../../config/DB/index');
const {formatDate} = require("../../utils/formatDate");

const departmentSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String,required:true },
    head: { type:String,required:true },
    createdAt:{type:String,required:true,formatDate},
    createdBy:{type:String,required:true},
});

module.exports = mongoose.model("Departments",departmentSchema)

/**
 * Department Schema
 * Description: This schema will manage the different departments within the school.
 * Attributes:
 * name (String) - The name of the department.
 * description (String) - A brief description of the department.
 * head (ObjectId) - A reference to the user who is the head of the department.
 * **/
