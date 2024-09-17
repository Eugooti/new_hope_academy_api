const mongoose = require('../../config/DB/index');

const {Schema} = mongoose;

const inventorySchema = new Schema({
    itemName: { type: String, required: true },
    quantity: { type: Number, required: true },
    department: { type: String,required: true },
    condition:{type:String,required: true,enum:["Good","Average","Poor"]},
    lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Inventory', inventorySchema);