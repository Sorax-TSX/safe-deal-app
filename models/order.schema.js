const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create order Schema
const OrderSchema = new Schema({
    description: { type: String, require: true },
    seller: { type: String, require: true },
    buyer: { type: String, require: true },
    initiator: { type: String, require: true },
    messages: [
        {
            author: String,
            message: String
        }
    ],
    status: { type: String, require: true },
    tax: { type: Number, require: true },
    orderAmount: { type: Number, require: true },
    totalAmount: { type: Number, require: true }
});

const Order = mongoose.model('order', OrderSchema);

module.exports = Order;
