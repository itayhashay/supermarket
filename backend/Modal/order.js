const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({

    name: {
        type: String,
        require: true,
        trim: true
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    amount: {
        type: Number,
        require: true
    },
    orderId: {
        type: Date,
        default: Date.now()
    }
})

const Order = mongoose.model('order', orderSchema);
module.exports = Order;