const {crudMethods} = require("../CRUDmiddleware");
const {addToFeeStructure} = require("./AddToFeeStructure");
const {removeFromFeeStructure} = require("./removeFromFeeStructure");
const {createFeeStructure} = require("./createFeeStructure");
const {learnerFee} = require("./learnerFee");
const {feePayment} = require("./feePayment");
const {removeOptionalFeeItems} = require("./removeOptionalFeeItems");
const {createVendor} = require("./createVendor");
const financeMethods= (model)=>{
    const methods = {...crudMethods(model)}

    model.addToFeeStructure = async (req,res)=>{
        await addToFeeStructure(model,req,res)
    }

    methods.removeFromFeeStructure = async (req,res)=>{
        await removeFromFeeStructure(model,req,res)
    }

    methods.createFeeStructure = async (req,res)=>{
        await createFeeStructure(model,req,res)
    }

    methods.learnerFee= async (req,res)=>{
        await learnerFee(model,req,res)
    }

    methods.feePayment = async (req,res)=>{
        await feePayment(model,req,res)
    }

    methods.removeOptionalFeeItems = async (req,res)=>{
        await removeOptionalFeeItems(model,req,res)
    }

    methods.createVendor = async (req,res)=>{
        await createVendor(model,req,res)
    }


    return methods;
}

module.exports = {financeMethods}