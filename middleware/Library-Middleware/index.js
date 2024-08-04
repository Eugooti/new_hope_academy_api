const {createBook} = require("./New_Book");
const {updateBookCopies} = require("./updateBookCopies");
const {crudMethods} = require("../CRUDmiddleware");
const {bookBorrowing} = require("./bookBorrowing");
const {returnBook} = require("./returnBook");
const libraryMethods = (model) => {
  const methods = {...crudMethods(model)}

    methods.createBook = async (req,res)=>{
      await createBook(model,req,res)
    }

    methods.updateBookCopies = async (req,res)=>{
      await updateBookCopies(model,req,res)
    }

    methods.bookBorrowing = async (req,res)=>{
      await bookBorrowing(model,req,res)
    }

    methods.returnBook = async (req,res)=>{
      await returnBook(model,req,res)
    }

    return methods
}

module.exports = {libraryMethods}
