const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({

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
    }
})

const Product = mongoose.model('product', productSchema);
module.exports = Product;