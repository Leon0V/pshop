const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    code: Number,
    name: String,
    avatar: String,
    description: String,
    price: Number,
    category: String,
    animal: String,
    comments: [String]
});

module.exports = mongoose.model('Product', productSchema);
