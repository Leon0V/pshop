const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    code: Number,
    name: String,
    surname: String,
    birthdate: Date,
    phone: String,
    address: String,
    complement: String,
    city: String,
    state: String,
    country: String,
    active: Boolean,
    isDeleted: Boolean,
    avatar: String,
    cardNumber: String,
    cardHolder: String,
    cvc: String,
    email: String,
    password: String
});

module.exports = mongoose.model('User', userSchema);
