const mongoose = require('../../config/DB/index')
const {formatDate} = require("../../utils/formatDate");

const author = new mongoose.Schema({
    name:{type:String,required:true}
})

const publisher = new mongoose.Schema({
    name:{type:String,required:true}
})

const bookId = new mongoose.Schema({
    bookId:{type:String,required:true}
})

const books = new mongoose.Schema({
    title:{type:String,required:true},
    authors:[author],
    category:{type:String,required:true},
    subCategory:{type:String,required:true},
    subject:{type:String,required:true},
    publishers:[publisher],
    ISBN:{type:String,required:true,unique:true},
    publicationDate:{type:String,required:true},
    totalCopies:{type:Number,required:true},
    availableCopies: { type: Number, required: true },
    booksId:[bookId],
    date:{type:String,required:true,default:formatDate},
    recordedBy:{type:Number,required:true}
})
module.exports = mongoose.model("books",books)

/**
 * Library Resource Schema
 * Description: This schema will manage the books available in the library.
 * Attributes:
 * title (String) - The title of the resource.
 * author ([String]) - The author/s of the resource.
 * category (String) - The category or genre of the resource.
 * ISBN (String) - The International Standard Book Number.
 * publicationDate (String)
 * publishers ([String])
 * booksId [(bookId)] - id of all the books registered to the system
 * availableCopies (Number) - The number of available copies.
 * totalCopies (Number) - The total number of copies.
 * date (String) - Date the book is recorded to the library
 * **/
