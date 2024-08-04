const mongoose = require('../../config/DB/index')

const transactions = new mongoose.Schema({

})

module.exports = mongoose.model('transactionsSchema',transactions)
